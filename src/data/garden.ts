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
  recipientName: 'Karlita',

  intro: {
    /** Pequeña línea sobre la frase principal. Déjala vacía ('') si no la quieres. */
    eyebrow: 'Un detallito para mi',
    /** [INTRO_MESSAGE] — la primera frase que ella va a leer. */
    message: 'HERMOSA NIÑA',
    /** Texto del botón que hace germinar la semilla. Provisional. */
    action: 'Echemosle un vistazo',
    /** Se lee bajo el botón, muy pequeño. Déjalo vacío ('') si no lo quieres. */
    hint: 'a mis sentimientos',
  },

  garden: {
    /** Frase breve que recibe al llegar al jardín (aparece y se desvanece). */
    welcome: 'Un pequeño recordatorio de cuanto Te Amo',
    /** Invitación discreta a explorar. */
    hint: 'Toca las semillas en orden',
    /** Se muestra cuando ya descubrió las cinco primeras semillas. */
    readyForFinal: '¡¡¡Ahora el gran FINAL!!!',
    /** Se muestra cuando ya descubrió el jardín entero, final incluido. */
    completed: 'Feliz DÍA de las Flores Amarillas',
    /**
     * El progreso no se muestra como un marcador —se ve en el jardín, que
     * cada vez tiene más flores—, pero sí se anuncia a los lectores de
     * pantalla. Esta es la palabra que usan (ej. "2 de 6 descubiertas").
     */
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
    label: 'Lo que mi corazón grita',
    subtitle: 'Unas pequeñas Palabras',
    ariaLabel: 'Primera semilla del jardín',
    accent: 'var(--seed-accent-1)',
    placement: {
      portrait: { x: 24, y: 62 },
      landscape: { x: 13, y: 71 },
      depth: 0.55,
    },
    experience: {
      eyebrow: 'Unas pequeñas Palabras',
      title: 'Lo que mi corazón grita',
      subtitle: 'Un breve poema para cuando lo necesites',
      backLabel: 'Volver al jardín',
      closingWhisper: 'Siempre escribiendote con pasión',
      blocks: [
        {
          kind: 'text',
          heading: 'Flores Amarillas',
          paragraphs: [
            'Caen los pétalos de las flores,',
            'como en aquellos amores,',
            'en donde el sentimiento brilla,',
            'persistente como las olas en la orilla.',
            '',
            'A pesar de que la distancia es un desafío,',
            'que nunca podrá tumbar este navío.',
            'Ya han pasado los meses y el año,',
            'y cada día más te extraño.',
            '',
            'Los días sin tu calor me pesan,',
            'las noches me atormentan,',
            'pero el anhelo de un mañana me levanta',
            'y a toda duda espanta.',
            '',
            'Eres mi luz.',
            'Eres mi cielo.',
            '',
            'Tu eres mi mayor anhelo.',
          ],
        },
        {
          kind: 'quote',
          text: 'Amo tu locura',
          attribution: '-Hectortilla    4/2/2025',
        },
      ],
    },
  },

  /* ── Semilla 02 ──────────────────────────────────────────────────── */
  {
    id: 'seed-02',
    kind: 'experience',
    label: 'Un vistazo a nuestro pasado',
    subtitle: 'Nuestras memorias',
    ariaLabel: 'Segunda semilla del jardín',
    accent: 'var(--seed-accent-2)',
    placement: {
      portrait: { x: 73, y: 53 },
      landscape: { x: 30, y: 52 },
      depth: 0.38,
    },
    experience: {
      eyebrow: 'Nuestras memorias',
      title: 'Un vistazo a nuestro pasado',
      subtitle: 'A veces toca mirar el pasado para imaginar el futuro',
      backLabel: 'Volver al jardín',
      closingWhisper: 'Mis fotitos favoritas jijiji',
      blocks: [
        {
          kind: 'text',
          paragraphs: ['Algunos de los momentos mejor capturados que hemos pasado'],
        },
        {
          kind: 'gallery',
          heading: 'Bueno... mejor dicho mis favoritas...',
          /*
           * FOTOGRAFÍAS
           * 1. Copia tus imágenes en la carpeta  public/media/
           * 2. Escribe aquí la ruta, por ejemplo:  src: 'media/foto-01.jpg'
           *    (sin barra al principio, para que funcione en GitHub Pages)
           * 3. `alt` describe la foto para quien no pueda verla.
           * Mientras `src` sea null se muestra un marco vacío con el placeholder.
           */
          items: [
            { src: null, alt: 'La foto de nuestra primera cita, el comienzo de todo', caption: 'media/foto-1.jpg' },
            { src: null, alt: 'La foto de tu fiesta de 15, aca apenas estabamos comenzando a salir', caption: 'media/foto-2.jpg' },
            { src: null, alt: 'La foto del asado de tu mama, y como se asento la relación', caption: 'media/foto-3.jpg' },
          ],
        },
      ],
    },
  },

  /* ── Semilla 03 ──────────────────────────────────────────────────── */
  {
    id: 'seed-03',
    kind: 'experience',
    label: 'Lo que corazon escucha',
    subtitle: 'Nuestra musiquita',
    ariaLabel: 'Tercera semilla del jardín',
    accent: 'var(--seed-accent-3)',
    placement: {
      portrait: { x: 44, y: 74 },
      landscape: { x: 46, y: 80 },
      depth: 0.74,
    },
    experience: {
      eyebrow: 'Nuestra musiquita',
      title: 'Lo que corazon escucha',
      subtitle: 'El soundtrack que nos ha acompañado todo este tiempo',
      backLabel: 'Volver al jardín',
      closingWhisper: 'Perdonnnn, no supe que mas canciones ponerrrrrrr',
      blocks: [
        {
          kind: 'playlist',
          heading: 'Por fin nuestra Playlist...',
          /*
           * PLAYLIST
           * Pega aquí la URL de EMBED (no la de compartir):
           *   Spotify → botón "..." → Compartir → Insertar → copia el src del iframe
           *   Ejemplo: 'https://open.spotify.com/embed/playlist/XXXXXXXX'
           * Mientras sea null se muestra la lista de canciones de abajo.
           */
          embedUrl: null, <iframe data-testid="embed-iframe" style="border-radius:12px" src="https://open.spotify.com/embed/playlist/142c6245QedAIHP9BYNRGC?utm_source=generator&si=527086c8c6a3407e" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
          tracks: [
            { title: 'Te encontre', artist: 'El Vega', note: 'Nuestra cancion de la relacion' },
            { title: 'Te Amo y Mas', artist: 'El Libro de la Vida', note: 'Representa la ternura de la relacion junto con nuestra pelicula' },
            { title: 'Machu Pichu', artist: 'Camilo y Evaluna', note: 'Fue magico cuando la cantamos juntos, ademas si estas loca...' },
          ],
        },
        {
          kind: 'text',
          paragraphs: ['[...con la famosa Trinidad Musical]'],
        },
      ],
    },
  },

  /* ── Semilla 04 ──────────────────────────────────────────────────── */
  {
    id: 'seed-04',
    kind: 'experience',
    label: 'Lo que mi corazon ve',
    subtitle: 'Una pequeña charla conmigo',
    ariaLabel: 'Cuarta semilla del jardín',
    accent: 'var(--seed-accent-4)',
    placement: {
      portrait: { x: 78, y: 83 },
      landscape: { x: 70, y: 57 },
      depth: 0.86,
    },
    experience: {
      eyebrow: 'Una pequeña charla conmigo',
      title: 'Lo que mi corazon ve',
      subtitle: 'Para cuando te sientas solita =)',
      backLabel: 'Volver al jardín',
      closingWhisper: 'Con mucho amor, de tu Amor',
      blocks: [
        {
          kind: 'video',
          heading: 'Siempre a un Click de distancia',
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
          caption: 'Una pequeña conversacion para que puedas hablar conmigo sin importar que pase',
        },
        {
          kind: 'facts',
          heading: 'Nuestras Fechas:',
          items: [
            { label: '15/12/2024', value: 'Nuestra Primera Cita' },
            { label: '16/1/2025', value: 'Nuestro Primer Beso' },
            { label: '4/2/2025', value: 'El comienzo de este viaje' },
          ],
        },
      ],
    },
  },

  /* ── Semilla 05 ──────────────────────────────────────────────────── */
  {
    id: 'seed-05',
    kind: 'experience',
    label: '¿Donde estamos?',
    subtitle: 'Un mapa de nuestra nueva etapa',
    ariaLabel: 'Quinta semilla del jardín',
    accent: 'var(--seed-accent-5)',
    placement: {
      portrait: { x: 19, y: 87 },
      landscape: { x: 88, y: 76 },
      depth: 0.94,
    },
    experience: {
      eyebrow: 'Un mapa de nuestra nueva etapa',
      title: '¿Donde estamos?',
      subtitle: 'Damnnn si que estamos lejos, pero aunque estemos 1000 kilometros separados...',
      backLabel: 'Volver al jardín',
      closingWhisper: '...Nuestros corazones siempre estaran juntos',
      blocks: [
        {
          kind: 'map',
          heading: '¡¡¡A 3632.67 km de distancia!!!',
          /*
           * MAPA
           * Si dejas `embedUrl` en null se dibuja un mapa ilustrado con los
           * dos puntos y la línea que los une (no necesita internet ni claves).
           * Si prefieres un mapa real: Google Maps → Compartir → Insertar un mapa
           * → copia el valor de src y pégalo aquí entre comillas.
           */
          embedUrl: null,
          from: { label: 'Tec de Monterrey', detail: 'Guadalajara, Mexico' },
          to: { label: 'GCB', detail: 'Chía, Colombia' },
          distanceLabel: '3632.67 km',
          note: 'Pero tu corazon a solo milimetros',
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
    label: 'El gran final',
    subtitle: 'Lo que te mereces en este dia tan especial',
    ariaLabel: 'La última semilla del jardín',
    accent: 'var(--seed-accent-future)',
    placement: {
      portrait: { x: 50, y: 49 },
      landscape: { x: 57, y: 51 },
      depth: 0.45,
      scale: 1.3,
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
  message: 'Feliz Día De las Flores Amarillas',
  /** Línea pequeña encima de la frase. Déjala vacía ('') si no la quieres. */
  eyebrow: 'Esta vez yo encontre la solucion',
  /** Firma bajo la frase. Vacía ('') para no mostrarla. */
  signature: '-Hectortilla',

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
