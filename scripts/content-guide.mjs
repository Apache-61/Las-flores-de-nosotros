/*
 * Genera CONTENT_GUIDE.md a partir de src/data/contentManifest.ts, y de
 * paso comprueba que el manifiesto siga describiendo la realidad.
 *
 * Se ejecuta con:  npm run content:guide
 *
 * Node 22 lee los .ts directamente, así que la guía se construye con los
 * mismos datos que carga la página: si un texto cambia en garden.ts, la
 * guía lo refleja sin que haya que copiar nada a mano.
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..')

/** Con --check sólo comprueba: no reescribe la guía. Sirve para el CI. */
const soloComprobar = process.argv.includes('--check')

const { contentManifest, contentSections } = await import(
  resolve(raiz, 'src/data/contentManifest.ts')
)
const { resolveContentValue, contentStatus, formatContentValue } = await import(
  resolve(raiz, 'src/data/contentValues.ts')
)

const problemas = []

/* ── 1. Los identificadores son únicos y correlativos ──────────────── */
const vistos = new Set()
contentManifest.forEach((item, indice) => {
  if (vistos.has(item.id)) problemas.push(`Identificador repetido: ${item.id}`)
  vistos.add(item.id)
  const esperado = String(indice + 1).padStart(2, '0')
  if (item.id !== esperado) {
    problemas.push(`El elemento ${item.id} (${item.label}) rompe la numeración: se esperaba ${esperado}`)
  }
})

/* ── 2. Cada elemento documentado existe de verdad ─────────────────── */
const titulo = readFileSync(resolve(raiz, 'index.html'), 'utf8').match(/<title>(.*?)<\/title>/)?.[1]

function valorDe(item) {
  if (item.path === 'meta.documentTitle') return titulo
  return resolveContentValue(item.path)
}

contentManifest.forEach((item) => {
  if (valorDe(item) === undefined) {
    problemas.push(`El elemento ${item.id} (${item.label}) apunta a "${item.path}", que no existe en los datos`)
  }
})

/* ── 3. Un marcador sin rellenar lleva el número que le toca ───────── */
/*
 * Rellenar un elemento hace desaparecer su marcador, que es justamente
 * lo que se espera. Lo que no puede pasar es que quede un marcador con
 * un número que no es el suyo: eso sí sería una referencia rota.
 */
const marcador = /\[(\d{2,3})\s*—/g
contentManifest.forEach((item) => {
  const valor = valorDe(item)
  const textos = JSON.stringify(valor ?? '')
  for (const encontrado of textos.matchAll(marcador)) {
    if (encontrado[1] !== item.id) {
      problemas.push(
        `El elemento ${item.id} (${item.label}) contiene un marcador de otro elemento: ${encontrado[0]}…`,
      )
    }
  }
})

/* ── 4. Nada editable se queda sin documentar ──────────────────────── */
const documentados = new Set(contentManifest.map((item) => item.path))
const sinDocumentar = []

function recorrer(valor, ruta) {
  if (typeof valor === 'string' || valor === null) {
    // ¿lo cubre este path o alguno de sus padres?
    const cubierto = [...documentados].some(
      (doc) => ruta === doc || ruta.startsWith(doc + '.'),
    )
    if (!cubierto) sinDocumentar.push(ruta)
    return
  }
  if (Array.isArray(valor)) {
    valor.forEach((entrada, i) => {
      const clave = entrada && typeof entrada === 'object' && 'id' in entrada ? entrada.id : i
      recorrer(entrada, `${ruta}.${clave}`)
    })
    return
  }
  if (valor && typeof valor === 'object') {
    Object.entries(valor).forEach(([clave, entrada]) => recorrer(entrada, `${ruta}.${clave}`))
  }
}

const { gardenContent, seeds, finalSequence } = await import(resolve(raiz, 'src/data/garden.ts'))
const { audioCues } = await import(resolve(raiz, 'src/data/audio.ts'))

recorrer(gardenContent, 'gardenContent')
recorrer(seeds, 'seeds')
recorrer(finalSequence, 'finalSequence')
recorrer(audioCues, 'audio')

// Lo que es apariencia o mecánica, no contenido, no necesita ficha propia
const noEsContenido = /\.(accent|kind|placement|id|mode|loop|volume|ambient)$|^seeds\.[^.]+\.experience\.blocks\.\d+\.kind$/
const huerfanos = sinDocumentar.filter((ruta) => !noEsContenido.test(ruta))
huerfanos.forEach((ruta) => problemas.push(`Sin documentar en el manifiesto: ${ruta}`))

/* ── 5. La guía ────────────────────────────────────────────────────── */
const etiquetaTipo = {
  text: 'Texto', paragraphs: 'Párrafos', quote: 'Frase', photo: 'Fotografía',
  video: 'Video', playlistUrl: 'Playlist', song: 'Canción', fact: 'Dato',
  place: 'Lugar', url: 'Enlace', audio: 'Sonido', choice: 'Opción',
  title: 'Título', settings: 'Ajuste',
}
const casilla = { pendiente: '⬜ Pendiente', opcional: '⬜ Opcional', 'por-defecto': '☑️ Ya funciona', listo: '✅ Listo' }

const md = []
const w = (linea = '') => md.push(linea)

const total = contentManifest.length
const obligatorios = contentManifest.filter((i) => i.required)
const pendientes = contentManifest.filter((i) => ['pendiente', 'opcional'].includes(contentStatus(i, valorDe(i))))

w('# El Jardín de Nuestra Distancia — Guía de contenido')
w()
w('> Este archivo se genera solo. No lo edites a mano: ejecuta `npm run content:guide`')
w('> y se vuelve a escribir a partir de `src/data/contentManifest.ts` y de los datos reales.')
w()
w(`**${total} elementos** en total, de los cuales **${obligatorios.length} son imprescindibles**.`)
w(`Ahora mismo faltan **${pendientes.length}**.`)
w()
w('Cada elemento tiene un identificador —`[01]`, `[02]`…— que es el mismo aquí, en el')
w('manifiesto y en la página. Para ver esos identificadores sobre la propia experiencia,')
w('abre la página añadiendo `#author` al final de la dirección. Para verlos como lista,')
w('usa `#content`.')
w()
w('## Cómo se rellena')
w()
w('1. Abre `src/data/garden.ts` (o `src/data/audio.ts` para los sonidos).')
w('2. Busca el elemento por su identificador: los textos pendientes llevan el número dentro, así: `[03 — ESCRIBE LA FRASE DE ENTRADA]`.')
w('3. Sustituye el marcador completo, corchetes incluidos, por tu texto.')
w('4. Las fotos, los videos y los sonidos se copian en `public/media/` y `public/audio/`, y en el archivo se escribe la ruta sin barra inicial: `media/foto.jpg`.')
w()
w('En cualquier texto puedes escribir `{nombre}` y se sustituye por el nombre del elemento [01].')
w()
w('---')
w()

for (const seccion of contentSections) {
  w(`## ${seccion}`)
  w()
  for (const item of contentManifest.filter((i) => i.section === seccion)) {
    const valor = valorDe(item)
    const estado = contentStatus(item, valor)
    w(`### [${item.id}] ${item.label}`)
    w()
    w(`**Qué escribir:** ${item.description}`)
    w()
    w(`**Dónde aparece:** ${item.where}`)
    w()
    w(`**Formato:** ${item.format}`)
    w()
    w(`**Tipo:** ${etiquetaTipo[item.type] ?? item.type} · ${item.required ? 'Obligatorio' : 'Opcional'}`)
    w()
    w(`**Dónde se edita:** \`${item.file}\` → \`${item.path}\``)
    w()
    const actual = formatContentValue(valor)
    w(`**Valor actual:** \`${actual.length > 120 ? actual.slice(0, 120) + '…' : actual}\``)
    w()
    w(`**Estado:** ${casilla[estado]}`)
    w()
  }
  w('---')
  w()
}

w('## Lista de comprobación')
w()
for (const linea of [
  'Completar todos los textos',
  'Agregar las fotografías',
  'Agregar el video',
  'Configurar la playlist',
  'Configurar el mapa',
  'Configurar los sonidos',
  'Escribir la frase final',
  'Revisar la experiencia completa',
  'Probar en móvil',
  'Probar en escritorio',
  'Salir del modo autor (quitar `#author` de la dirección)',
  'Ejecutar la build final (`npm run build`)',
]) w(`- [ ] ${linea}`)
w()

/* ── Resultado ─────────────────────────────────────────────────────── */
if (problemas.length > 0) {
  console.error('\nEl manifiesto no cuadra con el proyecto:\n')
  problemas.forEach((p) => console.error('  · ' + p))
  console.error(`\n${problemas.length} problema(s). No se ha escrito la guía.\n`)
  process.exit(1)
}

if (soloComprobar) {
  const enDisco = readFileSync(resolve(raiz, 'CONTENT_GUIDE.md'), 'utf8')
  if (enDisco !== md.join('\n')) {
    console.error(
      '\nCONTENT_GUIDE.md no está al día con el manifiesto.\n' +
        'Ejecuta `npm run content:guide` y vuelve a confirmar los cambios.\n',
    )
    process.exit(1)
  }
  console.log(`El manifiesto cuadra: ${total} elementos, ${pendientes.length} pendientes.`)
} else {
  writeFileSync(resolve(raiz, 'CONTENT_GUIDE.md'), md.join('\n'))
  console.log(`CONTENT_GUIDE.md actualizada: ${total} elementos, ${pendientes.length} pendientes.`)
}
