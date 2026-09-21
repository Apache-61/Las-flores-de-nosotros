import type { Transition, Variants } from 'framer-motion'

/**
 * Curvas y duraciones compartidas.
 * Todas las animaciones del jardín salen de aquí para que el proyecto
 * entero tenga el mismo temperamento: nada brusco, nada mecánico.
 */

export const easeSoft = [0.22, 0.61, 0.36, 1] as const
export const easeRise = [0.16, 0.84, 0.34, 1] as const
export const easeBreath = [0.45, 0, 0.55, 1] as const

export const transitions = {
  quick: { duration: 0.28, ease: easeSoft } satisfies Transition,
  soft: { duration: 0.6, ease: easeSoft } satisfies Transition,
  slow: { duration: 1.1, ease: easeRise } satisfies Transition,
  bloom: { duration: 1.4, ease: easeRise } satisfies Transition,
  drift: { duration: 2.4, ease: easeSoft } satisfies Transition,
}

/** Entrada habitual: aparece subiendo apenas. */
export const riseIn: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: transitions.slow },
  exit: { opacity: 0, y: -10, transition: transitions.soft },
}

/** Para listas: los hijos entran uno detrás de otro. */
export function stagger(delayChildren = 0.2, staggerChildren = 0.12): Variants {
  return {
    hidden: {},
    visible: { transition: { delayChildren, staggerChildren } },
    exit: {},
  }
}

/** Respiración: el latido base de todo lo vivo del jardín. */
export function breathing(depth: number, reduced: boolean) {
  if (reduced) return {}
  const amount = 0.018 + depth * 0.02
  return {
    scale: [1, 1 + amount, 1],
    y: [0, -(1.5 + depth * 2.5), 0],
    transition: {
      duration: 4.6 + depth * 1.8,
      ease: easeBreath,
      repeat: Infinity,
      repeatType: 'loop' as const,
    },
  }
}
