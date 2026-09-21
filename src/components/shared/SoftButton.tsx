import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import './SoftButton.css'

interface SoftButtonProps {
  children: ReactNode
  onClick: () => void
  /** `solid` para la acción principal, `ghost` para volver al jardín. */
  variant?: 'solid' | 'ghost'
  className?: string
  ariaLabel?: string
  /** Identificador del manifiesto de contenido, para el modo autor. */
  cid?: string
}

/**
 * El único control con forma de botón del proyecto.
 * Área táctil generosa, foco visible y reacción suave al tocarlo.
 */
export function SoftButton({
  children,
  onClick,
  variant = 'solid',
  className = '',
  ariaLabel,
  cid,
}: SoftButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      data-cid={cid}
      className={`soft-button soft-button--${variant} ${className}`.trim()}
      whileHover={{ scale: 1.035 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 320, damping: 26 }}
    >
      <span className="soft-button__label">{children}</span>
    </motion.button>
  )
}
