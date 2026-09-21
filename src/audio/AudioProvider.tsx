import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { audioCues, type AudioCueId } from '../data/audio'

interface AudioApi {
  /** true sólo si hay al menos una pista configurada en src/data/audio.ts */
  available: boolean
  enabled: boolean
  toggle: () => void
  /** Reproduce una pista puntual. Silencioso si no hay archivo. */
  play: (cue: AudioCueId) => void
  /** Se llama en el primer toque real del usuario (requisito del navegador). */
  unlock: () => void
}

const AudioContext = createContext<AudioApi | null>(null)

const hasAnyTrack = Object.values(audioCues).some((cue) => cue.src !== null)

/**
 * Sistema de audio preparado pero dormido.
 * Mientras no haya archivos configurados no crea ningún elemento <audio>,
 * no descarga nada y no muestra controles. Nada suena sin interacción previa.
 */
export function AudioProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false)
  const unlocked = useRef(false)
  const elements = useRef(new Map<AudioCueId, HTMLAudioElement>())

  const elementFor = useCallback((id: AudioCueId): HTMLAudioElement | null => {
    const cue = audioCues[id]
    if (!cue.src) return null
    let element = elements.current.get(id)
    if (!element) {
      element = new Audio(cue.src)
      element.preload = 'auto'
      element.loop = Boolean(cue.loop)
      elements.current.set(id, element)
    }
    element.volume = cue.volume
    return element
  }, [])

  const play = useCallback(
    (id: AudioCueId) => {
      if (!enabled || !unlocked.current) return
      const element = elementFor(id)
      if (!element) return
      element.currentTime = 0
      void element.play().catch(() => {
        /* el navegador puede negarse; no es un error que deba romper nada */
      })
    },
    [elementFor, enabled],
  )

  const unlock = useCallback(() => {
    if (!hasAnyTrack) return
    unlocked.current = true
    setEnabled(true)
  }, [])

  const toggle = useCallback(() => {
    unlocked.current = true
    setEnabled((value) => !value)
  }, [])

  // La música ambiental sigue al interruptor
  useEffect(() => {
    const ambient = elementFor('ambient')
    if (!ambient) return
    if (enabled && unlocked.current) {
      void ambient.play().catch(() => undefined)
    } else {
      ambient.pause()
    }
  }, [elementFor, enabled])

  useEffect(() => {
    const pool = elements.current
    return () => {
      pool.forEach((element) => {
        element.pause()
        element.src = ''
      })
      pool.clear()
    }
  }, [])

  const value = useMemo<AudioApi>(
    () => ({ available: hasAnyTrack, enabled, toggle, play, unlock }),
    [enabled, play, toggle, unlock],
  )

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
}

export function useAudio(): AudioApi {
  const context = useContext(AudioContext)
  if (!context) throw new Error('useAudio debe usarse dentro de <AudioProvider>')
  return context
}
