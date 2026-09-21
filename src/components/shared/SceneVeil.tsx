import { AnimatePresence, motion } from 'framer-motion'
import { useMemo } from 'react'
import { between, createRandom } from '../../lib/random'
import { FlowerHead } from '../flowers/FlowerHead'
import { easeRise, easeSoft } from './motion'
import './SceneVeil.css'

export type VeilPhase = 'idle' | 'cover' | 'reveal'

export interface VeilState {
  phase: VeilPhase
  /** Punto de la pantalla desde donde nace la luz (centro de la semilla). */
  origin: { x: number; y: number }
  accent: string
}

/**
 * La transición entre el jardín y una experiencia.
 *
 * No es un modal ni un cambio de ruta: la semilla se abre en luz hasta
 * llenar la pantalla, y desde esa luz nace la nueva escena. Con la luz
 * salen despedidos unos pétalos, para que el momento tenga algo que
 * mirar y no sea un simple lavado de color.
 */
export function SceneVeil({ state }: { state: VeilState }) {
  const { phase, origin, accent } = state

  /** Radio necesario para que el círculo cubra la esquina más lejana. */
  const radius = useMemo(() => {
    if (typeof window === 'undefined') return 1200
    const { innerWidth: w, innerHeight: h } = window
    const dx = Math.max(origin.x, w - origin.x)
    const dy = Math.max(origin.y, h - origin.y)
    return Math.hypot(dx, dy) * 1.06
  }, [origin.x, origin.y])

  /** Los pétalos que salen volando del punto que se acaba de tocar. */
  const petals = useMemo(() => {
    const random = createRandom(Math.round(origin.x * 7 + origin.y * 13) + 1)
    return Array.from({ length: 9 }, (_, id) => {
      const angle = between(random, 0, Math.PI * 2)
      const distance = between(random, 130, 340)
      return {
        id,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance - between(random, 20, 90),
        rotate: between(random, -180, 180),
        size: between(random, 34, 72),
        delay: between(random, 0, 0.16),
      }
    })
  }, [origin.x, origin.y])

  return (
    <AnimatePresence>
      {phase !== 'idle' && (
        <div className="scene-veil" aria-hidden="true">
          <motion.div
            key="veil-light"
            className="scene-veil__light"
            style={{
              left: origin.x,
              top: origin.y,
              width: radius * 2,
              height: radius * 2,
              marginLeft: -radius,
              marginTop: -radius,
              ['--veil-accent' as string]: accent,
            }}
            initial={{ scale: 0, opacity: 0.9 }}
            animate={
              phase === 'cover'
                ? { scale: 1, opacity: 1, transition: { duration: 0.6, ease: easeRise } }
                : { scale: 1.22, opacity: 0, transition: { duration: 0.8, ease: easeSoft } }
            }
            exit={{ opacity: 0, transition: { duration: 0.4, ease: easeSoft } }}
          />

          {phase === 'cover' &&
            petals.map((petal) => (
              <motion.div
                key={petal.id}
                className="scene-veil__petal"
                style={{ left: origin.x, top: origin.y }}
                initial={{ x: 0, y: 0, scale: 0.2, opacity: 0, rotate: 0 }}
                animate={{
                  x: petal.x,
                  y: petal.y,
                  scale: 1,
                  opacity: [0, 1, 1, 0],
                  rotate: petal.rotate,
                }}
                transition={{
                  duration: 1.2,
                  delay: petal.delay,
                  ease: easeSoft,
                  opacity: { times: [0, 0.18, 0.62, 1] },
                }}
              >
                <FlowerHead accent={accent} petals={7} variant={petal.id} size={petal.size} />
              </motion.div>
            ))}
        </div>
      )}
    </AnimatePresence>
  )
}
