import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useAudio } from '../../audio/AudioProvider'
import { gardenContent, gardenSettings, withName } from '../../data/garden'
import { easeRise, easeSoft } from '../shared/motion'
import { SoftButton } from '../shared/SoftButton'
import { FlowerHead } from '../flowers/FlowerHead'
import './IntroScene.css'

type Phase = 'waiting' | 'germinating' | 'rising'

interface IntroSceneProps {
  /** Se llama cuando la germinación termina, con el punto de luz en pantalla. */
  onGerminated: (origin: { x: number; y: number }) => void
}

/**
 * PANTALLA 0 — la semilla inicial.
 *
 * Una sola semilla en la oscuridad y una frase. Al tocarla germina:
 * brota el tallo, se abren las hojas, nace la primera flor y la luz
 * crece hasta llevarse la pantalla entera al jardín.
 */
export function IntroScene({ onGerminated }: IntroSceneProps) {
  const reduced = useReducedMotion()
  const audio = useAudio()
  const [phase, setPhase] = useState<Phase>('waiting')
  const seedRef = useRef<HTMLDivElement>(null)
  const timers = useRef<number[]>([])

  useEffect(() => {
    const pending = timers.current
    return () => pending.forEach((timer) => window.clearTimeout(timer))
  }, [])

  const germinate = useCallback(() => {
    if (phase !== 'waiting') return
    // Primer gesto real del usuario: aquí (y sólo aquí) puede despertar el audio
    audio.unlock()
    audio.play('germination')
    setPhase('germinating')

    const total = reduced ? 900 : gardenSettings.germinationMs
    timers.current.push(
      window.setTimeout(() => setPhase('rising'), total * 0.72),
      window.setTimeout(() => {
        const rect = seedRef.current?.getBoundingClientRect()
        onGerminated(
          rect
            ? { x: rect.left + rect.width / 2, y: rect.top + rect.height * 0.35 }
            : { x: window.innerWidth / 2, y: window.innerHeight / 2 },
        )
      }, total),
    )
  }, [audio, onGerminated, phase, reduced])

  const growing = phase !== 'waiting'

  return (
    <motion.section
      className="intro"
      aria-label="Entrada al jardín"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: easeSoft } }}
      transition={{ duration: 1.6, ease: easeSoft }}
    >
      {/* La luz que nace de la semilla y termina llevándose la escena */}
      <motion.div
        className="intro__light"
        aria-hidden="true"
        animate={{
          opacity: phase === 'rising' ? 0.9 : growing ? 0.42 : 0.16,
          scale: phase === 'rising' ? 3.4 : growing ? 1.5 : 1,
        }}
        transition={{ duration: phase === 'rising' ? 1.6 : 2.4, ease: easeRise }}
      />

      <div className="intro__body">
        <AnimatePresence>
          {!growing && (
            <motion.header
              key="intro-text"
              className="intro__text"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14, transition: { duration: 0.6, ease: easeSoft } }}
              transition={{ duration: 1.5, ease: easeRise, delay: 0.5 }}
            >
              {gardenContent.intro.eyebrow && (
                <p className="intro__eyebrow u-eyebrow">
                  {withName(gardenContent.intro.eyebrow)}
                </p>
              )}
              <h1 className="intro__message u-serif">
                {withName(gardenContent.intro.message)}
              </h1>
            </motion.header>
          )}
        </AnimatePresence>

        {/* La semilla: es a la vez ilustración y botón */}
        <div className="intro__seed-area">
          <motion.div
            ref={seedRef}
            className="intro__seed"
            animate={
              growing || reduced
                ? {}
                : { y: [0, -7, 0], scale: [1, 1.035, 1] }
            }
            transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Germination phase={phase} reduced={Boolean(reduced)} />
          </motion.div>
        </div>

        <AnimatePresence>
          {!growing && (
            <motion.div
              key="intro-action"
              className="intro__action"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.4 } }}
              transition={{ duration: 1.2, ease: easeRise, delay: 1.1 }}
            >
              <SoftButton onClick={germinate}>{gardenContent.intro.action}</SoftButton>
              {gardenContent.intro.hint && (
                <p className="intro__hint">{withName(gardenContent.intro.hint)}</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  )
}

/**
 * El dibujo de la germinación.
 * Todo ocurre en un mismo SVG para que el tallo, las hojas y la flor
 * crezcan como una sola planta y no como tres animaciones sueltas.
 */
function Germination({ phase, reduced }: { phase: Phase; reduced: boolean }) {
  const growing = phase !== 'waiting'
  const duration = reduced ? 0.4 : 1
  const total = gardenSettings.germinationMs / 1000

  return (
    <motion.div
      className="germination"
      /* En reposo la planta baja para que la semilla quede centrada;
         al germinar sube y deja sitio al tallo que va a crecer. */
      animate={{ y: growing ? 0 : 72 }}
      transition={{ duration: 1.6, ease: easeRise }}
    >
      <svg
        className="germination__plant"
        viewBox="0 0 160 220"
        width="160"
        height="220"
        aria-hidden="true"
      >
        {/* tallo */}
        <motion.path
          d="M80 196 C 78 168, 84 140, 80 104"
          fill="none"
          stroke="var(--c-leaf)"
          strokeWidth="3.4"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={growing ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: duration * total * 0.42, ease: easeRise }}
        />
        {/* hoja izquierda */}
        <motion.path
          d="M80 160 C 58 156, 44 140, 46 122 C 66 126, 77 142, 80 160 Z"
          fill="var(--c-leaf)"
          initial={{ scale: 0, opacity: 0 }}
          animate={growing ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          style={{ originX: '80px', originY: '160px' }}
          transition={{
            duration: duration * total * 0.26,
            delay: growing ? duration * total * 0.28 : 0,
            ease: easeRise,
          }}
        />
        {/* hoja derecha */}
        <motion.path
          d="M80 142 C 102 138, 116 122, 114 104 C 94 108, 83 124, 80 142 Z"
          fill="var(--c-leaf-soft)"
          initial={{ scale: 0, opacity: 0 }}
          animate={growing ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          style={{ originX: '80px', originY: '142px' }}
          transition={{
            duration: duration * total * 0.26,
            delay: growing ? duration * total * 0.38 : 0,
            ease: easeRise,
          }}
        />

        {/* la semilla, partiéndose al germinar */}
        <motion.g
          animate={growing ? { y: 6, opacity: 0.85 } : { y: 0, opacity: 1 }}
          transition={{ duration: duration * 1.2, ease: easeSoft }}
        >
          <ellipse cx="80" cy="196" rx="18" ry="13" fill="var(--c-earth)" />
          <ellipse cx="80" cy="192" rx="12" ry="8" fill="var(--c-earth-soft)" opacity="0.5" />
          <ellipse cx="80" cy="208" rx="30" ry="5" fill="rgba(0, 0, 0, 0.35)" />
        </motion.g>
      </svg>

      {/* la primera flor, que abre al final de la germinación */}
      <motion.div
        className="germination__flower"
        initial={{ scale: 0, opacity: 0, rotate: -40 }}
        animate={
          growing
            ? { scale: 1, opacity: 1, rotate: 0 }
            : { scale: 0, opacity: 0, rotate: -40 }
        }
        transition={{
          duration: duration * total * 0.34,
          delay: growing ? duration * total * 0.5 : 0,
          ease: easeRise,
        }}
      >
        <FlowerHead accent="var(--c-flower)" petals={8} variant={3} size={64} />
      </motion.div>
    </motion.div>
  )
}
