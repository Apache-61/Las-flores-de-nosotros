import { AnimatePresence } from 'framer-motion'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useAudio } from './audio/AudioProvider'
import { seeds } from './data/garden'
import type { Seed, SeedId } from './data/types'
import { useGardenProgress } from './hooks/useGardenProgress'
import { ExperienceScene } from './components/experiences/ExperienceScene'
import { FinalScene } from './components/final/FinalScene'
import { GardenScene } from './components/garden/GardenScene'
import { IntroScene } from './components/intro/IntroScene'
import { SceneVeil, type VeilState } from './components/shared/SceneVeil'
import { SoundToggle } from './components/shared/SoundToggle'
import './App.css'

type Scene =
  | { name: 'intro' }
  | { name: 'garden' }
  | { name: 'experience'; seedId: SeedId }
  | { name: 'final' }

/** Cuánto tarda la luz en cubrir la pantalla antes de cambiar de escena. */
const COVER_MS = 600
/** Cuánto tarda en recogerse después, ya con la escena nueva detrás. */
const REVEAL_MS = 820

const centerOfScreen = () => ({
  x: typeof window === 'undefined' ? 0 : window.innerWidth / 2,
  y: typeof window === 'undefined' ? 0 : window.innerHeight / 2,
})

/**
 * El director de escena.
 *
 * Aquí se decide qué se ve y, sobre todo, cómo se pasa de una cosa a
 * otra: nunca hay un corte seco. Toda transición es la misma idea —
 * una luz que nace en un punto concreto (la semilla), crece hasta
 * llenar la pantalla, y se recoge dejando ver lo que hay detrás.
 */
export default function App() {
  const progress = useGardenProgress()
  const audio = useAudio()
  const [scene, setScene] = useState<Scene>({ name: 'intro' })
  const [focusPoint, setFocusPoint] = useState<{ x: number; y: number } | null>(null)
  const [veil, setVeil] = useState<VeilState>({
    phase: 'idle',
    origin: centerOfScreen(),
    accent: 'var(--c-flower)',
  })
  const timers = useRef<number[]>([])

  useEffect(() => {
    const pending = timers.current
    return () => pending.forEach((timer) => window.clearTimeout(timer))
  }, [])

  /** Cubre la pantalla de luz, cambia de escena y vuelve a descubrirla. */
  const transition = useCallback(
    (
      origin: { x: number; y: number },
      accent: string,
      swap: () => void,
    ) => {
      setVeil({ phase: 'cover', origin, accent })
      timers.current.push(
        window.setTimeout(() => {
          swap()
          setVeil((current) => ({ ...current, phase: 'reveal' }))
        }, COVER_MS),
        window.setTimeout(
          () => setVeil((current) => ({ ...current, phase: 'idle' })),
          COVER_MS + REVEAL_MS,
        ),
      )
    },
    [],
  )

  /* ── De la semilla inicial al jardín ─────────────────────────────── */
  const handleGerminated = useCallback(
    (origin: { x: number; y: number }) => {
      transition(origin, 'var(--c-flower-soft)', () => setScene({ name: 'garden' }))
    },
    [transition],
  )

  /* ── Tocar una semilla ───────────────────────────────────────────── */
  const handleSelectSeed = useCallback(
    (seed: Seed, origin: { x: number; y: number }) => {
      audio.play('seedTap')
      setFocusPoint(origin)
      progress.markOpening(seed.id)

      transition(origin, seed.accent, () => {
        progress.markOpening(null)
        setScene(
          seed.kind === 'final'
            ? { name: 'final' }
            : { name: 'experience', seedId: seed.id },
        )
      })
    },
    [audio, progress, transition],
  )

  /* ── Volver al jardín ────────────────────────────────────────────── */
  const handleCloseExperience = useCallback(
    (seedId: SeedId) => {
      const seed = seeds.find((item) => item.id === seedId)
      const origin = focusPoint ?? centerOfScreen()

      transition(origin, seed?.accent ?? 'var(--c-flower)', () => {
        // La semilla se convierte en flor justo al volver: el jardín
        // que ella encuentra ya no es el mismo que dejó.
        progress.markDiscovered(seedId)
        audio.play('bloom')
        setScene({ name: 'garden' })
      })

      // Quien navega con teclado vuelve justo a la flor que acaba de abrir
      timers.current.push(
        window.setTimeout(() => {
          document
            .querySelector<HTMLButtonElement>(`[data-seed-id="${seedId}"]`)
            ?.focus({ preventScroll: true })
        }, COVER_MS + 120),
      )
    },
    [audio, focusPoint, progress, transition],
  )

  const handleCloseFinal = useCallback(() => {
    const origin = focusPoint ?? centerOfScreen()
    transition(origin, 'var(--c-flower)', () => setScene({ name: 'garden' }))
  }, [focusPoint, transition])

  const openSeed = useMemo(
    () =>
      scene.name === 'experience'
        ? seeds.find((seed) => seed.id === scene.seedId)
        : undefined,
    [scene],
  )

  const finalSeed = useMemo(() => seeds.find((seed) => seed.kind === 'final'), [])
  const gardenMounted = scene.name !== 'intro'

  return (
    <div className="app-shell">
      {gardenMounted && (
        <GardenScene
          progress={progress}
          onSelectSeed={handleSelectSeed}
          isBackground={scene.name !== 'garden'}
          focusPoint={focusPoint}
        />
      )}

      <AnimatePresence>
        {scene.name === 'intro' && (
          <IntroScene key="intro" onGerminated={handleGerminated} />
        )}

        {openSeed && (
          <ExperienceScene
            key={openSeed.id}
            seed={openSeed}
            onClose={() => handleCloseExperience(openSeed.id)}
          />
        )}

        {scene.name === 'final' && (
          <FinalScene
            key="final"
            accent={finalSeed?.accent ?? 'var(--c-flower)'}
            onSeen={progress.markFinalSeen}
            onReturn={handleCloseFinal}
          />
        )}
      </AnimatePresence>

      <SceneVeil state={veil} />

      {scene.name === 'garden' && <SoundToggle />}
    </div>
  )
}
