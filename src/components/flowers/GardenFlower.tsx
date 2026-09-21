import { motion, useReducedMotion } from 'framer-motion'
import { memo } from 'react'
import { FlowerHead } from './FlowerHead'
import { easeRise } from '../shared/motion'
import './GardenFlower.css'

interface GardenFlowerProps {
  accent: string
  /** Escala final de la flor dentro del jardín. */
  scale: number
  variant?: number
  petals?: number
  /** Retraso de la floración, para que no abran todas a la vez. */
  delay?: number
  /** true cuando la flor acaba de nacer de una semilla descubierta. */
  justBloomed?: boolean
}

/**
 * Una flor abierta del jardín: tallo, hojas y cabeza.
 * Nace creciendo desde el suelo y después se mece muy despacio.
 */
export const GardenFlower = memo(function GardenFlower({
  accent,
  scale,
  variant = 0,
  petals = 8,
  delay = 0,
  justBloomed = false,
}: GardenFlowerProps) {
  const reduced = useReducedMotion()
  const sway = reduced
    ? {}
    : {
        rotate: [-1.6, 1.6, -1.6],
        transition: {
          duration: 6.5 + (variant % 4) * 0.9,
          ease: [0.45, 0, 0.55, 1] as const,
          repeat: Infinity,
          delay: variant * 0.3,
        },
      }

  return (
    <motion.div
      className="garden-flower"
      style={{ ['--flower-accent' as string]: accent }}
      initial={
        justBloomed
          ? { scaleY: 0.1, scaleX: 0.5, opacity: 0 }
          : { scaleY: 1, scaleX: 1, opacity: 1 }
      }
      animate={{ scaleY: 1, scaleX: 1, opacity: 1 }}
      transition={{ duration: 1.5, ease: easeRise, delay }}
    >
      <motion.div className="garden-flower__body" animate={sway}>
        <svg
          className="garden-flower__stem"
          viewBox="0 0 40 120"
          width={40 * scale}
          height={120 * scale}
          aria-hidden="true"
        >
          <path
            d="M20 120 C 18 88, 22 62, 20 30"
            fill="none"
            stroke="var(--c-leaf-deep)"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          <path
            d="M20 88 C 8 84, 3 74, 4 64 C 14 66, 19 76, 20 88 Z"
            fill="var(--c-leaf)"
            opacity="0.92"
          />
          <path
            d="M20 68 C 31 65, 36 56, 35 47 C 26 49, 21 58, 20 68 Z"
            fill="var(--c-leaf-soft)"
            opacity="0.85"
          />
        </svg>
        <motion.div
          className="garden-flower__head"
          initial={justBloomed ? { scale: 0, rotate: -35 } : false}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1.25, ease: easeRise, delay: delay + 0.35 }}
        >
          <FlowerHead
            accent={accent}
            petals={petals}
            variant={variant}
            size={52 * scale}
          />
        </motion.div>
      </motion.div>
      <span className="garden-flower__shadow" aria-hidden="true" />
    </motion.div>
  )
})
