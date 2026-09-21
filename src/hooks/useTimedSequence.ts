import { useEffect, useRef, useState } from 'react'

/**
 * Reproduce una secuencia de fases con duraciones propias.
 * La usa la animación final para encadenar sus momentos
 * (react → expand → storm → pullback → settle → phrase).
 */
export function useTimedSequence<T extends string>(
  steps: readonly { phase: T; duration: number }[],
  options: { enabled?: boolean; onComplete?: () => void } = {},
) {
  const { enabled = true, onComplete } = options
  const [index, setIndex] = useState(0)
  const completeRef = useRef(onComplete)
  completeRef.current = onComplete

  useEffect(() => {
    if (!enabled) return
    if (index >= steps.length) return
    const step = steps[index]
    if (!step) return
    const timer = window.setTimeout(() => {
      setIndex((value) => value + 1)
      if (index === steps.length - 1) completeRef.current?.()
    }, step.duration)
    return () => window.clearTimeout(timer)
    // `steps` es estable (useMemo en quien lo llama)
  }, [enabled, index, steps])

  const current = steps[Math.min(index, steps.length - 1)]?.phase

  return {
    phase: current as T,
    index,
    isComplete: index >= steps.length,
    /** true si ya se alcanzó (o se pasó) la fase indicada. */
    reached: (phase: T) => {
      const target = steps.findIndex((step) => step.phase === phase)
      return target !== -1 && index >= target
    },
  }
}
