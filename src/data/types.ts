/**
 * Tipos del jardín.
 * No necesitas editar este archivo para cambiar el contenido:
 * todo el texto vive en `src/data/garden.ts`.
 */

export type SeedId =
  | 'seed-01'
  | 'seed-02'
  | 'seed-03'
  | 'seed-04'
  | 'seed-05'
  | 'seed-future'

/**
 * Estados posibles de una semilla.
 * - `undiscovered`: aún cerrada (locked).
 * - `active`:       vibra sutilmente invitando a ser descubierta.
 * - `opening`:      el usuario la tocó y está creciendo hacia su experiencia.
 * - `discovered`:   ya fue abierta; en el jardín se ve como flor.
 * - `final`:        exclusivo de `seed-future`, la gran animación final.
 */
export type SeedStatus =
  | 'undiscovered'
  | 'active'
  | 'opening'
  | 'discovered'
  | 'final'

/** Coordenadas dentro del jardín, en % del escenario (0–100). */
export interface StagePoint {
  x: number
  y: number
}

export interface SeedPlacement {
  /** Posición cuando la pantalla es más alta que ancha (teléfono vertical). */
  portrait: StagePoint
  /** Posición cuando la pantalla es más ancha que alta (desktop, tablet horizontal). */
  landscape: StagePoint
  /**
   * Profundidad: 0 = al fondo del jardín (más pequeña y tenue),
   * 1 = en primer plano (más grande y nítida).
   */
  depth: number
  /** Multiplicador opcional de tamaño, para semillas con más presencia. */
  scale?: number
}

/* ── Bloques de contenido de una experiencia ────────────────────────────
 * Cada experiencia es una lista de bloques. Puedes mezclar los tipos
 * libremente, repetirlos, quitarlos o reordenarlos: la pantalla se
 * construye sola a partir de esta lista.
 * ──────────────────────────────────────────────────────────────────── */

export interface TextBlock {
  kind: 'text'
  /** Opcional. Un pequeño encabezado dentro de la experiencia. */
  heading?: string
  /** Cada string es un párrafo. */
  paragraphs: string[]
}

/** Una frase suelta, centrada y en serif. Para rematar una sección. */
export interface QuoteBlock {
  kind: 'quote'
  text: string
  attribution?: string
}

export interface PhotoItem {
  /** Ruta de la imagen. `null` = marco vacío con su placeholder visible. */
  src: string | null
  alt: string
  caption: string
}

export interface GalleryBlock {
  kind: 'gallery'
  heading?: string
  items: PhotoItem[]
}

export interface VideoBlock {
  kind: 'video'
  heading?: string
  /** Archivo local (`./media/...`) o URL de embed (YouTube/Vimeo). `null` = placeholder. */
  src: string | null
  /** `file` para un .mp4 propio, `embed` para un iframe de YouTube/Vimeo. */
  mode: 'file' | 'embed'
  poster?: string | null
  caption: string
}

export interface PlaylistBlock {
  kind: 'playlist'
  heading?: string
  /** URL de embed de Spotify/Apple Music/YouTube. `null` = placeholder. */
  embedUrl: string | null
  /** Lista visible de canciones (se muestra haya o no embed). */
  tracks: { title: string; artist: string; note?: string }[]
}

export interface MapPlace {
  label: string
  /** Texto libre: ciudad, país, coordenadas… lo que prefieras mostrar. */
  detail: string
}

export interface MapBlock {
  kind: 'map'
  heading?: string
  /** Los dos extremos de la distancia. */
  from: MapPlace
  to: MapPlace
  /** Texto que aparece sobre la línea que une ambos puntos. */
  distanceLabel: string
  /** URL de embed de Google Maps. `null` = se dibuja el mapa ilustrado. */
  embedUrl: string | null
  note?: string
}

/** Un dato suelto con etiqueta: fechas, números, cuentas pequeñas. */
export interface FactsBlock {
  kind: 'facts'
  heading?: string
  items: { label: string; value: string }[]
}

export type ExperienceBlock =
  | TextBlock
  | QuoteBlock
  | GalleryBlock
  | VideoBlock
  | PlaylistBlock
  | MapBlock
  | FactsBlock

export interface Experience {
  /** Encabezado pequeño sobre el título. */
  eyebrow: string
  title: string
  subtitle: string
  blocks: ExperienceBlock[]
  /** Texto del botón para volver al jardín. */
  backLabel: string
  /** Frase breve que aparece al cerrar la experiencia. */
  closingWhisper?: string
}

export interface Seed {
  id: SeedId
  /** `experience` = una de las cinco pantallas. `final` = la gran animación. */
  kind: 'experience' | 'final'
  /** Título visible (aparece al enfocar/tocar la semilla). */
  label: string
  subtitle: string
  /** Descripción para lectores de pantalla. */
  ariaLabel: string
  /** Variable CSS con el color propio de la semilla (ver tokens.css). */
  accent: string
  placement: SeedPlacement
  /** Solo para las semillas de tipo `experience`. */
  experience?: Experience
}
