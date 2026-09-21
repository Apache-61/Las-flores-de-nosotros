import type { Seed } from './types'

/* ══════════════════════════════════════════════════════════════════════
 *
 *   EL JARDÍN DE NUESTRA DISTANCIA — CONTENIDO
 *
 *   Este es el único archivo que necesitas tocar para escribir tu
 *   historia. No hace falta saber React: cambia el texto entre comillas
 *   y listo. Todo lo que está escrito como [ASÍ] es un placeholder
 *   esperando tus palabras.
 *
 *   Índice rápido:
 *     1. gardenContent      → nombre, frase de entrada, textos generales
 *     2. seeds              → las seis semillas y sus cinco experiencias
 *     3. finalSequence      → la animación final y la frase de cierre
 *     4. gardenSettings     → ritmo, cantidad de flores, ajustes finos
 *
 * ══════════════════════════════════════════════════════════════════════ */

/* ─────────────────────────────────────────────────────────────────────
 *  1. TEXTOS GENERALES
 * ───────────────────────────────────────────────────────────────────── */

export const gardenContent = {
  /** Su nombre. Puedes usarlo en cualquier texto escribiendo {nombre}. */
  recipientName: '[NOMBRE]',

  intro: {
    /** Pequeña línea sobre la frase principal. Déjala vacía ('') si no la quieres. */
    eyebrow: '[LÍNEA PEQUEÑA SOBRE LA FRASE]',
    /** [INTRO_MESSAGE] — la primera frase que ella va a leer. */
    message: '[ESCRIBE AQUÍ LA FRASE DE INTRODUCCIÓN]',
    /** Texto del botón que hace germinar la semilla. Provisional. */
    action: 'Haz crecer el jardín',
    /** Se lee bajo el botón, muy pequeño. Déjalo vacío ('') si no lo quieres. */
    hint: '[PISTA OPCIONAL]',
  },

  garden: {
    /** Frase breve que recibe al llegar al jardín (aparece y se desvanece). */
    welcome: '[FRASE DE BIENVENIDA AL JARDÍN]',
    /** Invitación discreta a explorar. */
    hint: '[PISTA PARA EXPLORAR]',
    /** Se muestra cuando ya descubrió las cinco primeras semillas. */
    readyForFinal: '[FRASE CUANDO YA SÓLO QUEDA LA ÚLTIMA SEMILLA]',
    /** Se muestra cuando ya descubrió el jardín entero, final incluido. */
    completed: '[FRASE CUANDO YA LO DESCUBRIÓ TODO]',
    /** Etiqueta del contador de progreso (ej. "2 de 6 descubiertas"). */
    progressLabel: 'descubiertas',
  },
} as const

/* ─────────────────────────────────────────────────────────────────────
 *  2. LAS SEIS SEMILLAS
 *
 *  Las cinco primeras abren una experiencia. La sexta (`seed-future`)
 *  lanza la animación final.
 *
 *  Todavía NO están decididos los temas: cada experiencia trae un tipo
 *  de bloque distinto sólo para que veas cómo se ve cada uno. Puedes
 *  mover los bloques de una semilla a otra, repetirlos o borrarlos.
 *
 *  Tipos de bloque disponibles:
 *    'text'      → párrafos            (una carta, un recuerdo escrito)
 *    'quote'     → una frase centrada
 *    'gallery'   → fotografías         ← [AGREGA FOTO]
 *    'video'     → un video            ← [VIDEO_URL]
 *    'playlist'  → música              ← [PLAYLIST_URL]
 *    'map'       → los dos lugares     ← [MAP_LOCATION_A] / [MAP_LOCATION_B]
 *    'facts'     → datos con etiqueta  (fechas, números)
 *
 *  `placement` decide dónde crece la semilla dentro del jardín.
 *  Los números son porcentajes de la pantalla (x = izq→der, y = arriba→abajo).
 * ───────────────────────────────────────────────────────────────────── */

export const seeds: Seed[] = [
  /* ── Semilla 01 ──────────────────────────────────────────────────── */
  {
    id: 'seed-01',
    kind: 'experience',
    label: '[TÍTULO DE LA SEMILLA 01]',
    subtitle: '[SUBTÍTULO 01]',
    ariaLabel: 'Primera semilla del jardín',
    accent: 'var(--seed-accent-1)',
    placement: {
      portrait: { x: 24, y: 62 },
      landscape: { x: 16, y: 66 },
      depth: 0.55,
    },
    experience: {
      eyebrow: '[PLACEHOLDER DE EXPERIENCIA 01]',
      title: '[TÍTULO DE ESTA SECCIÓN]',
      subtitle: '[SUBTÍTULO DE ESTA SECCIÓN]',
      backLabel: 'Volver al jardín',
      closingWhisper: '[FRASE AL CERRAR ESTA SECCIÓN]',
      blocks: [
        {
          kind: 'text',
          heading: '[ENCABEZADO OPCIONAL]',
          paragraphs: [
            '[LETTER_CONTENT — ESCRIBE AQUÍ TU MENSAJE. Cada texto entre comillas es un párrafo.]',
            '[ESCRIBE AQUÍ EL SEGUNDO PÁRRAFO. Puedes añadir tantos como quieras, separados por comas.]',
          ],
        },
        {
          kind: 'quote',
          text: '[ESCRIBE AQUÍ UNA FRASE CORTA]',
          attribution: '[FIRMA O FECHA]',
        },
      ],
    },
  },

  /* ── Semilla 02 ──────────────────────────────────────────────────── */
  {
    id: 'seed-02',
    kind: 'experience',
    label: '[TÍTULO DE LA SEMILLA 02]',
    subtitle: '[SUBTÍTULO 02]',
    ariaLabel: 'Segunda semilla del jardín',
    accent: 'var(--seed-accent-2)',
    placement: {
      portrait: { x: 73, y: 53 },
      landscape: { x: 32, y: 54 },
      depth: 0.38,
    },
    experience: {
      eyebrow: '[PLACEHOLDER DE EXPERIENCIA 02]',
      title: '[TÍTULO DE ESTA SECCIÓN]',
      subtitle: '[SUBTÍTULO DE ESTA SECCIÓN]',
      backLabel: 'Volver al jardín',
      closingWhisper: '[FRASE AL CERRAR ESTA SECCIÓN]',
      blocks: [
        {
          kind: 'text',
          paragraphs: ['[ESCRIBE AQUÍ UNA INTRODUCCIÓN BREVE PARA LAS FOTOS]'],
        },
        {
          kind: 'gallery',
          heading: '[ENCABEZADO DE LA GALERÍA]',
          /*
           * FOTOGRAFÍAS
           * 1. Copia tus imágenes en la carpeta  public/media/
           * 2. Escribe aquí la ruta, por ejemplo:  src: 'media/foto-01.jpg'
           *    (sin barra al principio, para que funcione en GitHub Pages)
           * 3. `alt` describe la foto para quien no pueda verla.
           * Mientras `src` sea null se muestra un marco vacío con el placeholder.
           */
          items: [
            { src: null, alt: '[DESCRIBE LA FOTO 01]', caption: '[MEMORY_01]' },
            { src: null, alt: '[DESCRIBE LA FOTO 02]', caption: '[MEMORY_02]' },
            { src: null, alt: '[DESCRIBE LA FOTO 03]', caption: '[MEMORY_03]' },
          ],
        },
      ],
    },
  },

  /* ── Semilla 03 ──────────────────────────────────────────────────── */
  {
    id: 'seed-03',
    kind: 'experience',
    label: '[TÍTULO DE LA SEMILLA 03]',
    subtitle: '[SUBTÍTULO 03]',
    ariaLabel: 'Tercera semilla del jardín',
    accent: 'var(--seed-accent-3)',
    placement: {
      portrait: { x: 44, y: 74 },
      landscape: { x: 50, y: 73 },
      depth: 0.74,
    },
    experience: {
      eyebrow: '[PLACEHOLDER DE EXPERIENCIA 03]',
      title: '[TÍTULO DE ESTA SECCIÓN]',
      subtitle: '[SUBTÍTULO DE ESTA SECCIÓN]',
      backLabel: 'Volver al jardín',
      closingWhisper: '[FRASE AL CERRAR ESTA SECCIÓN]',
      blocks: [
        {
          kind: 'playlist',
          heading: '[ENCABEZADO DE LA MÚSICA]',
          /*
           * PLAYLIST
           * Pega aquí la URL de EMBED (no la de compartir):
           *   Spotify → botón "..." → Compartir → Insertar → copia el src del iframe
           *   Ejemplo: 'https://open.spotify.com/embed/playlist/XXXXXXXX'
           * Mientras sea null se muestra la lista de canciones de abajo.
           */
          embedUrl: null, // [PLAYLIST_URL]
          tracks: [
            { title: '[CANCIÓN 01]', artist: '[ARTISTA]', note: '[POR QUÉ ESTA CANCIÓN]' },
            { title: '[CANCIÓN 02]', artist: '[ARTISTA]', note: '[POR QUÉ ESTA CANCIÓN]' },
            { title: '[CANCIÓN 03]', artist: '[ARTISTA]', note: '[POR QUÉ ESTA CANCIÓN]' },
          ],
        },
        {
          kind: 'text',
          paragraphs: ['[ESCRIBE AQUÍ ALGO SOBRE ESTA MÚSICA]'],
        },
      ],
    },
  },

  /* ── Semilla 04 ──────────────────────────────────────────────────── */
  {
    id: 'seed-04',
    kind: 'experience',
    label: '[TÍTULO DE LA SEMILLA 04]',
    subtitle: '[SUBTÍTULO 04]',
    ariaLabel: 'Cuarta semilla del jardín',
    accent: 'var(--seed-accent-4)',
    placement: {
      portrait: { x: 78, y: 83 },
      landscape: { x: 68, y: 52 },
      depth: 0.86,
    },
    experience: {
      eyebrow: '[PLACEHOLDER DE EXPERIENCIA 04]',
      title: '[TÍTULO DE ESTA SECCIÓN]',
      subtitle: '[SUBTÍTULO DE ESTA SECCIÓN]',
      backLabel: 'Volver al jardín',
      closingWhisper: '[FRASE AL CERRAR ESTA SECCIÓN]',
      blocks: [
        {
          kind: 'video',
          heading: '[ENCABEZADO DEL VIDEO]',
          /*
           * VIDEO — dos formas:
           *  a) Archivo propio:  mode: 'file'   src: 'media/video.mp4'
           *     (copia el archivo en public/media/)
           *  b) YouTube/Vimeo:   mode: 'embed'  src: 'https://www.youtube.com/embed/XXXXXXX'
           *     (usa siempre la URL de /embed/, no la de la barra del navegador)
           */
          mode: 'file',
          src: null, // [VIDEO_URL]
          poster: null, // imagen de portada opcional: 'media/portada.jpg'
          caption: '[DESCRIBE AQUÍ EL VIDEO]',
        },
        {
          kind: 'facts',
          heading: '[ENCABEZADO DE LOS DATOS]',
          items: [
            { label: '[ETIQUETA 01]', value: '[DATO 01]' },
            { label: '[ETIQUETA 02]', value: '[DATO 02]' },
            { label: '[ETIQUETA 03]', value: '[DATO 03]' },
          ],
        },
      ],
    },
  },

  /* ── Semilla 05 ──────────────────────────────────────────────────── */
  {
    id: 'seed-05',
    kind: 'experience',
    label: '[TÍTULO DE LA SEMILLA 05]',
    subtitle: '[SUBTÍTULO 05]',
    ariaLabel: 'Quinta semilla del jardín',
    accent: 'var(--seed-accent-5)',
    placement: {
      portrait: { x: 19, y: 87 },
      landscape: { x: 84, y: 69 },
      depth: 0.94,
    },
    experience: {
      eyebrow: '[PLACEHOLDER DE EXPERIENCIA 05]',
      title: '[TÍTULO DE ESTA SECCIÓN]',
      subtitle: '[SUBTÍTULO DE ESTA SECCIÓN]',
      backLabel: 'Volver al jardín',
      closingWhisper: '[FRASE AL CERRAR ESTA SECCIÓN]',
      blocks: [
        {
          kind: 'map',
          heading: '[ENCABEZADO DEL MAPA]',
          /*
           * MAPA
           * Si dejas `embedUrl` en null se dibuja un mapa ilustrado con los
           * dos puntos y la línea que los une (no necesita internet ni claves).
           * Si prefieres un mapa real: Google Maps → Compartir → Insertar un mapa
           * → copia el valor de src y pégalo aquí entre comillas.
           */
          embedUrl: null,
          from: { label: '[MAP_LOCATION_A]', detail: '[CIUDAD, PAÍS]' },
          to: { label: '[MAP_LOCATION_B]', detail: '[CIUDAD, PAÍS]' },
          distanceLabel: '[DISTANCIA ENTRE LOS DOS PUNTOS]',
          note: '[ESCRIBE AQUÍ ALGO SOBRE ESTOS DOS LUGARES]',
        },
      ],
    },
  },

  /* ── Semilla 06 — EL FUTURO DE NOSOTROS ──────────────────────────
   *  No abre una pantalla: dispara la animación final.
   *  Su contenido se configura abajo, en `finalSequence`.
   * ───────────────────────────────────────────────────────────────── */
  {
    id: 'seed-future',
    kind: 'final',
    label: '[TÍTULO DE LA SEMILLA FINAL]',
    subtitle: '[SUBTÍTULO DE LA SEMILLA FINAL]',
    ariaLabel: 'La última semilla del jardín',
    accent: 'var(--seed-accent-future)',
    placement: {
      portrait: { x: 50, y: 45 },
      landscape: { x: 50, y: 44 },
      depth: 0.22,
      scale: 1.25,
    },
  },
]

/* ─────────────────────────────────────────────────────────────────────
 *  3. LA ANIMACIÓN FINAL
 *
 *  La secuencia tiene cinco momentos:
 *    react    → la semilla reacciona
 *    expand   → las flores empiezan a llenar la pantalla
 *    storm    → la pantalla entera es un campo de flores amarillas
 *    pullback → la cámara se aleja y las flores se reorganizan
 *    settle   → se revela el ramo, todo se calma
 *    phrase   → aparece la frase final arriba
 *
 *  Los tiempos están en milisegundos. Súbelos o bájalos con libertad.
 * ───────────────────────────────────────────────────────────────────── */

export const finalSequence = {
  /** [FINAL_MESSAGE] — la frase que aparece sobre el ramo. */
  message: '[ESCRIBE AQUÍ LA FRASE FINAL]',
  /** Línea pequeña encima de la frase. Déjala vacía ('') si no la quieres. */
  eyebrow: '[PEQUEÑA LÍNEA SOBRE LA FRASE FINAL]',
  /** Firma bajo la frase. Vacía ('') para no mostrarla. */
  signature: '[FIRMA]',

  /** Apariencia de la frase final. */
  phrase: {
    /** 'serif' (emocional) o 'sans' (sobrio). */
    font: 'serif' as 'serif' | 'sans',
    /** Cualquier tamaño CSS. Por defecto usa el token --fs-final. */
    size: 'var(--fs-final)',
    /** Distancia desde el borde superior. */
    top: 'clamp(2.2rem, 9vh, 5.5rem)',
    /** Ancho máximo del bloque de texto. */
    maxWidth: '22ch',
  },

  timings: {
    react: 1400,
    expand: 3200,
    storm: 2200,
    pullback: 4600,
    settle: 1800,
    /** Espera antes de que aparezca la frase, ya formado el ramo. */
    phraseDelay: 900,
  },

  /** Número de flores del ramo. Menos en móvil para que vaya fluido. */
  flowerCount: { mobile: 58, desktop: 96 },

  /**
   * Permite volver al jardín una vez terminada la escena.
   * Aparece muy discreto y sólo después de la frase.
   */
  allowReturnToGarden: true,
  returnLabel: 'Volver al jardín',
} as const

/* ─────────────────────────────────────────────────────────────────────
 *  4. AJUSTES DEL JARDÍN
 * ───────────────────────────────────────────────────────────────────── */

export const gardenSettings = {
  /**
   * Cada cuánto cambia la semilla que vibra invitando a ser descubierta
   * (en milisegundos). Pon 0 para que nunca cambie sola.
   */
  activeSeedRotationMs: 9000,

  /** Duración de la germinación de la pantalla inicial. */
  germinationMs: 3200,

  /** Si es true, recuerda lo descubierto aunque cierre y vuelva a abrir. */
  persistProgress: true,

  /**
   * Para volver a empezar desde cero: abre la página con #reset al final
   * de la dirección. No hay botón visible para no romper la experiencia.
   */
  resetHash: '#reset',

  /** Densidad de la vegetación de fondo. Bájalo si algún móvil va lento. */
  foliageDensity: 1,

  /** Partículas de polen flotando. 0 las desactiva. */
  particleCount: 14,

  /** Una mariposa recorre el jardín de vez en cuando. */
  butterfly: true,
} as const

/** Reemplaza {nombre} por el nombre configurado arriba. */
export function withName(text: string): string {
  return text.replace(/\{nombre\}/g, gardenContent.recipientName)
}
