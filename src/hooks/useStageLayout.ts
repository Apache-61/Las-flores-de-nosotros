import { useEffect, useState } from 'react'

export interface StageLayout {
  /** true cuando la pantalla es más alta que ancha (teléfono vertical). */
  isPortrait: boolean
  /** true en pantallas pequeñas: menos partículas, menos flores. */
  isCompact: boolean
  /** true si el dispositivo no tiene cursor fino (no hay hover real). */
  isTouch: boolean
}

function read(): StageLayout {
  if (typeof window === 'undefined') {
    return { isPortrait: true, isCompact: true, isTouch: true }
  }
  return {
    isPortrait: window.innerHeight >= window.innerWidth,
    isCompact: Math.min(window.innerWidth, window.innerHeight) < 600,
    isTouch: !window.matchMedia('(hover: hover) and (pointer: fine)').matches,
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
