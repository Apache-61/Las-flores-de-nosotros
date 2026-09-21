import { between, createRandom } from './random'

export interface FinalFlower {
  id: number
  /** Desde dónde entra en pantalla (fuera del encuadre). */
  entry: { x: number; y: number }
  /** Dónde cae durante la tormenta de flores. */
  burst: { x: number; y: number; scale: number; rotate: number }
  /** Dónde termina, ya formando el ramo. */
  bouquet: { x: number; y: number; scale: number; rotate: number }
  /** Curva del tallo hasta la base del ramo (coordenadas en %). */
  stem: string
  petals: number
  variant: number
  accent: string
  /** 0–1: reparte los retrasos para que no se muevan todas a la vez. */
  delay: number
  /** Profundidad: las de atrás son más pequeñas y más tenues. */
  depth: number
}

/** Tonos amarillos del ramo, con algún matiz más cálido o más pálido. */
const palette = [
  'var(--c-flower)',
  'var(--c-flower)',
  'var(--c-flower-soft)',
  'var(--c-flower-deep)',
  'var(--c-flower-soft)',
  '#f7e2a4',
]

/** Punto donde se juntan todos los tallos: la mano que sostiene el ramo. */
export const BOUQUET_BASE = { x: 50, y: 79 }

/**
 * Construye el ramo.
 *
 * Cada flor conoce sus tres posiciones: por dónde entra, dónde cae
 * durante la tormenta y qué lugar ocupa en el ramo final. La animación
 * sólo tiene que llevarlas de una a otra.
 */
export function buildFinalFlowers(count: number, isPortrait: boolean): FinalFlower[] {
  const random = createRandom(31415)

  /*
   * La tormenta se reparte en una rejilla con desorden: así las flores
   * cubren la pantalla entera de verdad, sin claros ni amontonamientos.
   * El orden se baraja para que el viaje hacia el ramo no se vea
   * ordenado ni previsible.
   */
  const aspect = isPortrait ? 0.5 : 1.8
  const columns = Math.max(2, Math.round(Math.sqrt(count * aspect)))
  const rows = Math.ceil(count / columns)
  const cells = Array.from({ length: columns * rows }, (_, index) => index)
  for (let i = cells.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1))
    ;[cells[i], cells[j]] = [cells[j] as number, cells[i] as number]
  }
  // La cúpula del ramo se ajusta a la forma de la pantalla para que
  // siempre se lea como un ramo y no como un óvalo estirado.
  const rx = isPortrait ? 31 : 15
  const ry = isPortrait ? 16 : 22
  const center = { x: 50, y: isPortrait ? 49 : 45 }

  const golden = Math.PI * (3 - Math.sqrt(5))

  return Array.from({ length: count }, (_, id) => {
    const t = count === 1 ? 0 : id / (count - 1)
    const radial = Math.sqrt(t)
    const angle = id * golden

    const bouquetX = center.x + Math.cos(angle) * radial * rx + between(random, -1.6, 1.6)
    const bouquetY = center.y + Math.sin(angle) * radial * ry + between(random, -1.4, 1.4)

    // Las del borde quedan detrás; las del centro, delante y más grandes
    const depth = 1 - radial
    const bouquetScale = 0.52 + depth * 0.36 + random() * 0.09

    // Entrada: la mayoría brota del suelo, algunas llegan desde los lados
    const fromSide = random() < 0.3
    const entry = fromSide
      ? { x: random() < 0.5 ? between(random, -18, -6) : between(random, 106, 118), y: between(random, 10, 100) }
      : { x: between(random, -6, 106), y: between(random, 108, 132) }

    const cell = cells[id] ?? id
    const column = cell % columns
    const row = Math.floor(cell / columns)
    // Tamaños muy distintos: unas flores en primer plano, otras al fondo
    const burstScale = 0.85 + random() * 1.25

    // El tallo sale casi recto de la mano y se abre arriba: así el ramo
    // se lee como un ramo y no como un puñado de varillas.
    const controlX =
      BOUQUET_BASE.x + (bouquetX - BOUQUET_BASE.x) * 0.2 + between(random, -2.5, 2.5)
    const controlY =
      BOUQUET_BASE.y - (BOUQUET_BASE.y - bouquetY) * 0.52 + between(random, -1.5, 1.5)

    return {
      id,
      entry,
      burst: {
        x: -10 + (column + 0.5 + between(random, -0.42, 0.42)) * (120 / columns),
        y: -10 + (row + 0.5 + between(random, -0.42, 0.42)) * (120 / rows),
        scale: burstScale,
        rotate: between(random, -50, 50),
      },
      bouquet: {
        x: bouquetX,
        y: bouquetY,
        scale: bouquetScale,
        rotate: between(random, -22, 22),
      },
      stem: `M ${BOUQUET_BASE.x} ${BOUQUET_BASE.y} Q ${controlX} ${controlY} ${bouquetX} ${bouquetY}`,
      petals: random() < 0.25 ? 10 : random() < 0.6 ? 8 : 7,
      variant: id % 12,
      accent: palette[Math.floor(random() * palette.length)] as string,
      delay: random(),
      depth,
    }
  })
}
