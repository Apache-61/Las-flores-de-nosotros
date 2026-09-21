import { useEffect, useState } from 'react'

export interface StageLayout {
  /** true cuando la pantalla es más alta que ancha (teléfono vertical). */
  isPortrait: boolean
  /** true en pantallas pequeñas: menos partículas, menos flores. */
  isCompact: boolean
  /** true si el dispositivo no tiene cursor fino (no hay hover real). */
  isTouch: boolean
  /**
   * Cuánto hay que agrandar lo que se dibuja. Todo está pensado a tamaño
   * de teléfono; en una pantalla grande, con el mismo número de píxeles,
   * las plantas quedarían diminutas y perdidas en el ancho.
   */
  sizeScale: number
  /** Cuánta vegetación cabe: un campo ancho necesita más para no verse vacío. */
  densityScale: number
}

function read(): StageLayout {
  if (typeof window === 'undefined') {
    return { isPortrait: true, isCompact: true, isTouch: true, sizeScale: 1, densityScale: 1 }
  }
  const { innerWidth: w, innerHeight: h } = window
  const clamp = (value: number, min: number, max: number) =>
    Math.min(max, Math.max(min, value))
  return {
    isPortrait: h >= w,
    isCompact: Math.min(w, h) < 600,
    isTouch: !window.matchMedia('(hover: hover) and (pointer: fine)').matches,
    sizeScale: clamp(w / 900, 1, 1.5),
    densityScale: clamp(w / 470, 1, 2),
  }
}

/** Observa la forma de la pantalla para colocar el jardín en consecuencia. */
export function useStageLayout(): StageLayout {
  const [layout, setLayout] = useState<StageLayout>(read)

  useEffect(() => {
    let frame = 0
    const update = () => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(() => setLayout(read()))
    }
    window.addEventListener('resize', update)
    window.addEventListener('orientationchange', update)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('resize', update)
      window.removeEventListener('orientationchange', update)
    }
  }, [])

  return layout
}
