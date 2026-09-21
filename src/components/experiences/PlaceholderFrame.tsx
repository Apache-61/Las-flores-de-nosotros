import type { ReactNode } from 'react'
import './PlaceholderFrame.css'

interface PlaceholderFrameProps {
  /** El texto entre corchetes que verás en pantalla. */
  token: string
  /** Dónde se rellena esto, para encontrarlo sin buscar. */
  hint: string
  ratio?: string
  children?: ReactNode
}

/**
 * Marco vacío a la espera de contenido real.
 *
 * Aunque sea un hueco, sigue estando dentro del jardín: nada de
 * rayas de maqueta. Desaparece solo en cuanto el dato deja de ser
 * `null` en src/data/garden.ts.
 */
export function PlaceholderFrame({
  token,
  hint,
  ratio = '4 / 3',
  children,
}: PlaceholderFrameProps) {
  return (
    <div className="placeholder-frame" style={{ aspectRatio: ratio }}>
      <div className="placeholder-frame__inner">
        {children ?? (
          <svg
            className="placeholder-frame__mark"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M24 40 C 23 32, 23 24, 24 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <path
              d="M24 28 C 15 26, 10 19, 11 11 C 20 13, 24 20, 24 28 Z"
              fill="currentColor"
              opacity="0.28"
            />
            <path
              d="M24 24 C 33 22, 38 15, 37 7 C 28 9, 24 16, 24 24 Z"
              fill="currentColor"
              opacity="0.18"
            />
          </svg>
        )}
        <p className="placeholder-frame__token">{token}</p>
        <p className="placeholder-frame__hint">{hint}</p>
      </div>
    </div>
  )
}
