import { motion, useReducedMotion } from 'framer-motion'
import { memo, useMemo } from 'react'
import { createRandom } from '../../lib/random'
import { Bud } from './Bud'
import { easeRise } from '../shared/motion'
import './GardenFlower.css'

interface GardenFlowerProps {
  accent: string
  /** Escala final de la flor dentro del jardín. */
  scale: number
  variant?: number
  /** Retraso del crecimiento, para que no broten todas a la vez. */
  delay?: number
  /** true cuando la flor acaba de nacer de una semilla descubierta. */
  justBloomed?: boolean
}

/**
 * La planta que deja una semilla descubierta.
 *
 * No abre flor: en el jardín no hay ni una, y ése es el motivo de que el
 * final funcione. Lo que crece aquí es tallo, hojas y un capullo todavía
 * cerrado, esperando. Todas las flores del regalo llegan de golpe en la
 * última semilla.
 */
export const GardenFlower = memo(function GardenFlower({
  accent,
  scale,
  variant = 0,
  delay = 0,
  justBloomed = false,
}: GardenFlowerProps) {
  const reduced = useReducedMotion()

  const stem = useMemo(() => {
    const random = createRandom(variant * 331 + 7)
    // Hacia dónde se inclina y cuánto
    const lean = (random() - 0.5) * 22
    const bend = 6 + random() * 9
    const top = 26 + random() * 10
    const side = lean >= 0 ? 1 : -1
    const leafY = 74 + random() * 10
    const leafY2 = 52 + random() * 10
    return {
      path: `M30 120 C ${30 - bend * side} ${88}, ${30 + bend * side * 1.4} ${58}, ${30 + lean} ${top}`,
      leafLow: `M${30 - bend * side * 0.4} ${leafY} C ${18 - bend} ${leafY - 4}, ${12 - bend} ${leafY - 16}, ${13 - bend} ${leafY - 26} C ${23 - bend} ${leafY - 22}, ${28 - bend} ${leafY - 10}, ${30 - bend * side * 0.4} ${leafY} Z`,
      leafHigh: `M${30 + bend * side * 0.5} ${leafY2} C ${42 + bend} ${leafY2 - 4}, ${48 + bend} ${leafY2 - 15}, ${47 + bend} ${leafY2 - 24} C ${37 + bend} ${leafY2 - 20}, ${32 + bend} ${leafY2 - 9}, ${30 + bend * side * 0.5} ${leafY2} Z`,
      lean,
      top,
    }
  }, [variant])

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
          viewBox="0 0 60 120"
          width={60 * scale}
          height={120 * scale}
          aria-hidden="true"
        >
          {/* Cada tallo se curva a su manera: seis tallos rectos e iguales
              delatarían que son el mismo componente repetido. */}
          <path
            d={stem.path}
            fill="none"
            stroke="var(--c-leaf-deep)"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          <path
            d={stem.leafLow}
            fill="var(--c-leaf)"
            opacity="0.94"
          />
          <path
            d={stem.leafHigh}
            fill="var(--c-leaf-soft)"
            opacity="0.86"
          />
        </svg>
        <motion.div
          className="garden-flower__head"
          style={{
            left: `${((30 + stem.lean) / 60) * 100}%`,
            top: `${(stem.top / 120) * 100}%`,
          }}
          initial={justBloomed ? { scale: 0, rotate: -18 } : false}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1.25, ease: easeRise, delay: delay + 0.35 }}
        >
          <Bud accent={accent} size={30 * scale} />
        </motion.div>
      </motion.div>
      <span className="garden-flower__shadow" aria-hidden="true" />
    </motion.div>
  )
})
