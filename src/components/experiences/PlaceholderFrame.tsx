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
 * Desaparece solo en cuanto el dato correspondiente deja de ser `null`
 * en src/data/garden.ts.
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
        {children}
        <p className="placeholder-frame__token">{token}</p>
        <p className="placeholder-frame__hint">{hint}</p>
      </div>
    </div>
  )
}
