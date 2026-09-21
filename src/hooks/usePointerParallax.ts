import { useEffect, useState } from 'react'

/**
 * Paralaje suave: devuelve la posición del cursor normalizada (-1…1).
 * En pantallas táctiles no se activa (no hay cursor que seguir) y se
 * queda en el centro, así que el jardín se comporta igual de bien.
 */
export function usePointerParallax(enabled: boolean) {
  const [pointer, setPointer] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!enabled) {
      setPointer({ x: 0, y: 0 })
      return
    }
    let frame = 0
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(() => {
        setPointer({
          x: (event.clientX / window.innerWidth) * 2 - 1,
          y: (event.clientY / window.innerHeight) * 2 - 1,
        })
      })
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
    }
  }, [enabled])

  return pointer
}
