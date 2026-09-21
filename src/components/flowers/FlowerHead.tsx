import { memo, useId, useMemo } from 'react'
import { createRandom } from '../../lib/random'

interface FlowerHeadProps {
  /** Color principal de los pétalos. */
  accent: string
  /** Número de pétalos. Entre 6 y 10 se ve natural. */
  petals?: number
  /** Cambia la forma sin cambiar el estilo: cada número da una flor distinta. */
  variant?: number
  size?: number
  className?: string
}

/**
 * La cabeza de una flor. Es SVG puro, sin animación propia:
 * así puede repetirse decenas de veces en la escena final sin coste.
 *
 * Cada flor lleva pétalos de dos capas y ligeras irregularidades: dos
 * flores nunca son idénticas, que es justo lo que las hace parecer vivas.
 */
export const FlowerHead = memo(function FlowerHead({
  accent,
  petals = 8,
  variant = 0,
  size = 100,
  className,
}: FlowerHeadProps) {
  // Identificador único por instancia: si dos flores compartieran el id del
  // degradado, la segunda se pintaría con el color de la primera.
  const uid = useId().replace(/:/g, '')

  const shape = useMemo(() => {
    const random = createRandom(variant * 977 + petals)
    const front = Array.from({ length: petals }, (_, index) => {
      const base = (360 / petals) * index
      return {
        rotate: base + (random() - 0.5) * 9,
        length: 0.88 + random() * 0.26,
        width: 0.82 + random() * 0.34,
        tone: random(),
      }
    })
    // Una segunda corona, girada y algo más corta, da volumen a la flor
    const back = Array.from({ length: petals }, (_, index) => {
      const base = (360 / petals) * index + 180 / petals
      return {
        rotate: base + (random() - 0.5) * 8,
        length: 0.7 + random() * 0.18,
        width: 0.74 + random() * 0.24,
      }
    })
    return { front, back, tilt: (random() - 0.5) * 16 }
  }, [petals, variant])

  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id={`petal-${uid}`} cx="50%" cy="78%" r="64%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.5" />
          <stop offset="52%" stopColor={accent} stopOpacity="0.93" />
          <stop offset="100%" stopColor={accent} stopOpacity="1" />
        </radialGradient>
        <radialGradient id={`core-${uid}`} cx="42%" cy="38%" r="70%">
          <stop offset="0%" stopColor="var(--c-flower-deep)" />
          <stop offset="100%" stopColor="var(--c-flower-core)" />
        </radialGradient>
      </defs>

      <g transform={`translate(50 50) rotate(${shape.tilt})`}>
        {/* corona trasera: sólo se asoma entre los pétalos delanteros */}
        {shape.back.map((petal, index) => (
          <path
            key={`b${index}`}
            d="M0 0 C -7.5 -18 -7.5 -31 0 -41 C 7.5 -31 7.5 -18 0 0 Z"
            fill={accent}
            opacity="0.5"
            transform={`rotate(${petal.rotate}) scale(${petal.width} ${petal.length})`}
          />
        ))}
        {shape.front.map((petal, index) => (
          <path
            key={`f${index}`}
            d="M0 0 C -8.5 -19 -9 -33 0 -44 C 9 -33 8.5 -19 0 0 Z"
            fill={`url(#petal-${uid})`}
            opacity={0.84 + petal.tone * 0.16}
            transform={`rotate(${petal.rotate}) scale(${petal.width} ${petal.length})`}
          />
        ))}
        <circle r="9.8" fill={`url(#core-${uid})`} />
        <circle r="5.6" fill="var(--c-flower-core)" opacity="0.45" />
        <circle r="2.4" cx="-1.8" cy="-2" fill="var(--c-cream-warm)" opacity="0.3" />
      </g>
    </svg>
  )
})
