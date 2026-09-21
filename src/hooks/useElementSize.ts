import { useEffect, useRef, useState } from 'react'

/**
 * Mide un elemento y se mantiene al día si cambia de tamaño.
 * La escena final la usa para colocar las flores con transformaciones
 * en píxeles, que el navegador anima sin recalcular la maquetación.
 */
export function useElementSize<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const update = () => {
      const rect = element.getBoundingClientRect()
      setSize({ width: rect.width, height: rect.height })
    }
    update()
    const observer = new ResizeObserver(update)
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return { ref, size }
}
