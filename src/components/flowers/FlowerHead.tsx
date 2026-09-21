import { memo, useMemo } from 'react'
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
 */
export const FlowerHead = memo(function FlowerHead({
  accent,
  petals = 8,
  variant = 0,
  size = 100,
  className,
}: FlowerHeadProps) {
  const shape = useMemo(() => {
    const random = createRandom(variant * 977 + petals)
    return Array.from({ length: petals }, (_, index) => {
      const base = (360 / petals) * index
      return {
        rotate: base + (random() - 0.5) * 7,
        length: 0.9 + random() * 0.22,
        width: 0.86 + random() * 0.3,
        tone: random(),
      }
    })
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
        <radialGradient id={`petal-${variant}-${petals}`} cx="50%" cy="76%" r="62%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.55" />
          <stop offset="55%" stopColor={accent} stopOpacity="0.95" />
          <stop offset="100%" stopColor={accent} stopOpacity="1" />
        </radialGradient>
      </defs>

      <g transform="translate(50 50)">
        {shape.map((petal, index) => (
          <path
            key={index}
            d="M0 0 C -8.5 -19 -8.5 -33 0 -44 C 8.5 -33 8.5 -19 0 0 Z"
            fill={`url(#petal-${variant}-${petals})`}
            opacity={0.82 + petal.tone * 0.18}
            transform={`rotate(${petal.rotate}) scale(${petal.width} ${petal.length})`}
          />
        ))}
        <circle r="9.5" fill="var(--c-flower-core)" opacity="0.92" />
        <circle r="6" fill="var(--c-flower-deep)" opacity="0.55" />
        <circle r="2.6" cx="-1.6" cy="-1.8" fill="var(--c-cream-warm)" opacity="0.35" />
      </g>
    </svg>
  )
})
