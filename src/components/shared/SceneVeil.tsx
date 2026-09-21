import { AnimatePresence, motion } from 'framer-motion'
import { useMemo } from 'react'
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
 * No es un modal ni un cambio de ruta: es la propia semilla la que se
 * abre en luz hasta llenar la pantalla, y desde esa luz nace la nueva
 * escena. Al volver, la luz se recoge en el mismo punto.
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

  return (
    <AnimatePresence>
      {phase !== 'idle' && (
        <motion.div
          key="veil"
          className="scene-veil"
          aria-hidden="true"
          style={{
            left: origin.x,
            top: origin.y,
            width: radius * 2,
            height: radius * 2,
            marginLeft: -radius,
            marginTop: -radius,
            // @ts-expect-error -- variable CSS propia del componente
            '--veil-accent': accent,
          }}
          initial={{ scale: 0, opacity: 0.9 }}
          animate={
            phase === 'cover'
              ? { scale: 1, opacity: 1, transition: { duration: 0.62, ease: easeRise } }
              : { scale: 1.25, opacity: 0, transition: { duration: 0.78, ease: easeSoft } }
          }
          exit={{ opacity: 0, transition: { duration: 0.4, ease: easeSoft } }}
        />
      )}
    </AnimatePresence>
  )
}
