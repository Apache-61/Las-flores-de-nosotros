import { memo } from 'react'

interface BudProps {
  accent: string
  size?: number
}

/**
 * Un capullo todavía cerrado.
 *
 * Es la única forma de flor que aparece antes del final: se adivina el
 * color, pero no se abre. En todo el jardín no hay una sola flor abierta,
 * y por eso la última semilla sorprende.
 */
export const Bud = memo(function Bud({ accent, size = 44 }: BudProps) {
  return (
    <svg
      viewBox="0 0 34 50"
      width={size}
      height={size * (50 / 34)}
      aria-hidden="true"
      focusable="false"
    >
      {/* sépalos que lo sostienen */}
      <path d="M17 50 C 9 42, 6 32, 9 23 C 13 29, 15 38, 17 50 Z" fill="var(--c-leaf-deep)" />
      <path d="M17 50 C 25 42, 28 32, 25 23 C 21 29, 19 38, 17 50 Z" fill="var(--c-leaf)" />
      {/* el capullo, con dos pliegues que insinúan los pétalos de dentro */}
      <ellipse cx="17" cy="20" rx="8.5" ry="15" fill={accent} opacity="0.95" />
      <path d="M17 5 C 11 11, 10 24, 13 34 C 14 24, 16 12, 17 5 Z" fill="var(--c-cream-warm)" opacity="0.24" />
      <path d="M17 5 C 23 11, 24 24, 21 34 C 20 24, 18 12, 17 5 Z" fill="var(--c-flower-deep)" opacity="0.3" />
    </svg>
  )
})
