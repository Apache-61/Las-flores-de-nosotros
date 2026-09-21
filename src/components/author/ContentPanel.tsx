import { useMemo, useState } from 'react'
import {
  contentManifest,
  contentSections,
  type ContentItem,
} from '../../data/contentManifest.ts'
import {
  contentStatus,
  formatContentValue,
  resolveContentValue,
  type ContentStatus,
} from '../../data/contentValues.ts'
import './contentPanel.css'

/*
 * La lista de todo lo que hace falta para terminar el regalo.
 *
 * Es una herramienta de consulta, no un editor: la página es estática y
 * no hay ningún sitio donde guardar. Escribir aquí daría la sensación
 * de haber guardado algo que en realidad se perdería al recargar, así
 * que cada ficha dice exactamente qué archivo abrir y qué línea buscar.
 */

const etiquetaTipo: Record<ContentItem['type'], string> = {
  text: 'Texto',
  paragraphs: 'Párrafos',
  quote: 'Frase',
  photo: 'Fotografía',
  video: 'Video',
  playlistUrl: 'Playlist',
  song: 'Canción',
  fact: 'Dato',
  place: 'Lugar',
  url: 'Enlace',
  audio: 'Sonido',
  choice: 'Opción',
  title: 'Título',
  settings: 'Ajuste',
}

const etiquetaEstado: Record<ContentStatus, string> = {
  pendiente: 'Pendiente',
  opcional: 'Opcional',
  'por-defecto': 'Ya funciona',
  listo: 'Listo',
}

function valorDe(item: ContentItem): unknown {
  if (item.path === 'meta.documentTitle') return document.title
  return resolveContentValue(item.path)
}

export function ContentPanel() {
  const [busqueda, setBusqueda] = useState('')
  const [soloPendientes, setSoloPendientes] = useState(false)
  const [copiado, setCopiado] = useState<string | null>(null)

  const fichas = useMemo(
    () =>
      contentManifest.map((item) => {
        const valor = valorDe(item)
        return { item, valor, estado: contentStatus(item, valor) }
      }),
    [],
  )

  const pendientes = fichas.filter((f) => f.estado === 'pendiente').length
  const obligatorios = fichas.filter((f) => f.item.required).length

  const visibles = useMemo(() => {
    const texto = busqueda.trim().toLowerCase()
    return fichas.filter(({ item, estado }) => {
      if (soloPendientes && estado !== 'pendiente' && estado !== 'opcional') return false
      if (!texto) return true
      return (
        item.id.includes(texto) ||
        item.label.toLowerCase().includes(texto) ||
        item.path.toLowerCase().includes(texto) ||
        item.section.toLowerCase().includes(texto)
      )
    })
  }, [busqueda, fichas, soloPendientes])

  const copiar = async (clave: string, texto: string) => {
    try {
      await navigator.clipboard.writeText(texto)
      setCopiado(clave)
      window.setTimeout(() => setCopiado(null), 1600)
    } catch {
      /* si el navegador no deja copiar, la ruta sigue estando a la vista */
    }
  }

  return (
    <div className="content-panel">
      <header className="content-panel__head">
        <h1>Contenido del jardín</h1>
        <p className="content-panel__resumen">
          {contentManifest.length} elementos · {obligatorios} imprescindibles ·{' '}
          <strong>{pendientes} pendientes</strong>
        </p>
        <p className="content-panel__nota">
          Todo se escribe en los archivos del proyecto. Esta lista sólo te dice qué
          falta y dónde está. Para ver los números sobre la propia experiencia, abre{' '}
          <a href="#author">#author</a>. Para volver al regalo,{' '}
          <a href="#">quita el # de la dirección</a>.
        </p>

        <div className="content-panel__controles">
          <input
            type="search"
            value={busqueda}
            onChange={(event) => setBusqueda(event.target.value)}
            placeholder="Buscar por número, nombre o sección"
            aria-label="Buscar elementos de contenido"
          />
          <label className="content-panel__filtro">
            <input
              type="checkbox"
              checked={soloPendientes}
              onChange={(event) => setSoloPendientes(event.target.checked)}
            />
            Sólo lo que falta
          </label>
        </div>
      </header>

      <div className="content-panel__lista">
        {contentSections.map((seccion) => {
          const dentro = visibles.filter(({ item }) => item.section === seccion)
          if (dentro.length === 0) return null
          return (
            <section key={seccion}>
              <h2 className="content-panel__seccion">{seccion}</h2>
              {dentro.map(({ item, valor, estado }) => (
                <article key={item.id} className={`content-card content-card--${estado}`}>
                  <div className="content-card__cabecera">
                    <span className="content-card__id">{item.id}</span>
                    <h3>{item.label}</h3>
                    <span className="content-card__estado">{etiquetaEstado[estado]}</span>
                  </div>

                  <p className="content-card__descripcion">{item.description}</p>

                  <dl className="content-card__datos">
                    <div>
                      <dt>Tipo</dt>
                      <dd>
                        {etiquetaTipo[item.type]} · {item.required ? 'obligatorio' : 'opcional'}
                      </dd>
                    </div>
                    <div>
                      <dt>Dónde aparece</dt>
                      <dd>{item.where}</dd>
                    </div>
                    <div>
                      <dt>Formato</dt>
                      <dd>{item.format}</dd>
                    </div>
                    <div>
                      <dt>Dónde se edita</dt>
                      <dd>
                        <code>{item.file}</code> → <code>{item.path}</code>
                      </dd>
                    </div>
                  </dl>

                  <p className="content-card__valor">
                    <span>Valor actual</span>
                    <code>{formatContentValue(valor) || '(vacío)'}</code>
                  </p>

                  <button
                    type="button"
                    className="content-card__copiar"
                    onClick={() => copiar(item.id, `${item.file} → ${item.path}`)}
                  >
                    {copiado === item.id ? 'Copiado' : 'Copiar la ruta'}
                  </button>
                </article>
              ))}
            </section>
          )
        })}

        {visibles.length === 0 && (
          <p className="content-panel__vacio">No hay ningún elemento que coincida.</p>
        )}
      </div>
    </div>
  )
}
