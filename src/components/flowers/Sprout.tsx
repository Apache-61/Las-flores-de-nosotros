import { motion, useReducedMotion } from 'framer-motion'
import { memo, useMemo } from 'react'
import { createRandom } from '../../lib/random'
import { easeRise } from '../shared/motion'
import { Bud } from './Bud'
import './sprout.css'

interface SproutProps {
  accent: string
  /** Tamaño del brote dentro del jardín. */
  scale: number
  variant?: number
  /** Retraso del crecimiento, para que no broten todos a la vez. */
  delay?: number
  /** true cuando la semilla acaba de abrirse: el brote nace a la vista. */
  justBloomed?: boolean
}

/**
 * Lo que deja una semilla al abrirse: la cáscara partida en la tierra,
 * un tallo corto, un par de hojas y el capullo todavía cerrado.
 *
 * Es deliberadamente bajo, a la altura del pasto. Un tallo alto
 * convertiría el jardín en un campo de plantas y le quitaría el
 * protagonismo a las semillas, que son lo que hay que descubrir.
 */
export const Sprout = memo(function Sprout({
  accent,
  scale,
  variant = 0,
  delay = 0,
  justBloomed = false,
}: SproutProps) {
  const reduced = useReducedMotion()

  const forma = useMemo(() => {
    const random = createRandom(variant * 331 + 7)
    const lean = (random() - 0.5) * 16
    const bend = 3 + random() * 5
    const lado = lean >= 0 ? 1 : -1
    return {
      tallo: `M30 62 C ${30 - bend * lado} 50, ${30 + bend * lado} 36, ${30 + lean} 24`,
      lean,
      hojaBaja: `M${30 - bend * lado * 0.5} 46 C ${16 - bend} 44, ${11 - bend} 36, ${13 - bend} 29 C ${22 - bend} 32, ${27 - bend} 39, ${30 - bend * lado * 0.5} 46 Z`,
      hojaAlta: `M${30 + bend * lado * 0.5} 36 C ${44 + bend} 34, ${49 + bend} 27, ${47 + bend} 20 C ${38 + bend} 23, ${33 + bend} 30, ${30 + bend * lado * 0.5} 36 Z`,
      giro: (random() - 0.5) * 10,
    }
  }, [variant])

  const vaiven = reduced
    ? {}
    : {
        rotate: [-1.4, 1.4, -1.4],
        transition: {
          duration: 6 + (variant % 4) * 0.7,
          ease: [0.45, 0, 0.55, 1] as const,
          repeat: Infinity,
          delay: variant * 0.3,
        },
      }

  return (
    <motion.div
      className="sprout"
      style={{ ['--sprout-accent' as string]: accent }}
      initial={justBloomed ? { scaleY: 0.05, scaleX: 0.5, opacity: 0 } : false}
      animate={{ scaleY: 1, scaleX: 1, opacity: 1 }}
      transition={{ duration: 1.5, ease: easeRise, delay }}
    >
      <motion.div className="sprout__body" animate={vaiven}>
        <svg
          className="sprout__plant"
          viewBox="0 0 60 78"
          width={60 * scale}
          height={78 * scale}
          aria-hidden="true"
        >
          {/* la cáscara abierta, aún en la tierra */}
          <g transform={`rotate(${forma.giro} 30 66)`}>
            <path
              d="M30 68 C 18 68, 12 62, 14 56 C 20 60, 26 64, 30 68 Z"
              fill="#5d4430"
            />
            <path
              d="M30 68 C 42 68, 48 62, 46 56 C 40 60, 34 64, 30 68 Z"
              fill="#7b5a3c"
            />
            <ellipse cx="30" cy="72" rx="15" ry="3" fill="rgba(35, 22, 12, 0.34)" />
          </g>

          <path
            d={forma.tallo}
            fill="none"
            stroke="var(--c-leaf-deep)"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <path d={forma.hojaBaja} fill="var(--c-leaf)" opacity="0.94" />
          <path d={forma.hojaAlta} fill="var(--c-leaf-soft)" opacity="0.88" />
        </svg>

        <motion.div
          className="sprout__bud"
          style={{ left: `${((30 + forma.lean) / 60) * 100}%`, top: `${(24 / 78) * 100}%` }}
          initial={justBloomed ? { scale: 0, rotate: -16 } : false}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: easeRise, delay: delay + 0.45 }}
        >
          <Bud accent={accent} size={20 * scale} />
        </motion.div>
      </motion.div>
    </motion.div>
  )
})
