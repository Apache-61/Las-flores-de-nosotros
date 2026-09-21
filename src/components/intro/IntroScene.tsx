import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useAudio } from '../../audio/AudioProvider'
import { cid } from '../../data/contentManifest'
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
      /* Se retira deprisa y detrás de la luz: si se desvaneciera despacio,
         se vería el fantasma de la planta sobre el jardín. */
      exit={{ opacity: 0, transition: { duration: 0.25, ease: easeSoft } }}
      transition={{ duration: 1.6, ease: easeSoft }}
    >
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
                <p className="intro__eyebrow u-eyebrow" data-cid={cid('gardenContent.intro.eyebrow')}>
                  {withName(gardenContent.intro.eyebrow)}
                </p>
              )}
              <h1 className="intro__message u-serif" data-cid={cid('gardenContent.intro.message')}>
                {withName(gardenContent.intro.message)}
              </h1>
            </motion.header>
          )}
        </AnimatePresence>

      </div>

      {/*
        El suelo de la escena. La semilla no flota: está plantada en la
        tierra, y de ahí sale la luz. Todo lo demás ocurre encima.
      */}
      <div className="intro__scene">
        <motion.div
          className="intro__soil"
          aria-hidden="true"
          initial={{ opacity: 0, y: 24 }}
          animate={{
            opacity: phase === 'rising' ? 0 : 1,
            y: phase === 'rising' ? 40 : 0,
          }}
          transition={{ duration: phase === 'rising' ? 1.5 : 2.4, ease: easeSoft }}
        />

        <motion.div
          className="intro__light"
          aria-hidden="true"
          initial={{ scale: 0.5, opacity: 0.34 }}
          animate={{
            scale: phase === 'rising' ? 7 : growing ? 1.7 : [0.62, 0.78, 0.62],
            opacity: phase === 'rising' ? 1 : growing ? 0.85 : [0.34, 0.52, 0.34],
          }}
          transition={
            phase === 'rising'
              ? { duration: 1.7, ease: easeRise }
              : growing
                ? { duration: 2.2, ease: easeRise }
                : { duration: 6.5, repeat: Infinity, ease: 'easeInOut' }
          }
        />

        {!growing && (
          <button
            type="button"
            className="intro__seed-hit"
            onClick={germinate}
            aria-hidden="true"
            tabIndex={-1}
          />
        )}

        <motion.div
          ref={seedRef}
          className="intro__seed"
          animate={growing || reduced ? {} : { y: [0, -5, 0], scale: [1, 1.03, 1] }}
          transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Germination phase={phase} reduced={Boolean(reduced)} />
        </motion.div>
      </div>

      <div className="intro__foot">
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
              <SoftButton onClick={germinate} cid={cid('gardenContent.intro.action')}>
                {gardenContent.intro.action}
              </SoftButton>
              {gardenContent.intro.hint && (
                <p className="intro__hint" data-cid={cid('gardenContent.intro.hint')}>{withName(gardenContent.intro.hint)}</p>
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
      /* El hueco de arriba del dibujo es el aire donde crecerá el tallo:
         la semilla se queda siempre apoyada en la línea de tierra. */
      animate={{ y: 0 }}
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
          <ellipse cx="80" cy="194" rx="24" ry="17" fill="#7b5a3c" />
          <ellipse cx="80" cy="189" rx="16" ry="10" fill="#9a7550" opacity="0.55" />
          <ellipse cx="80" cy="186" rx="7" ry="4" fill="var(--c-cream-warm)" opacity="0.22" />
          <ellipse cx="80" cy="210" rx="30" ry="4" fill="rgba(0, 0, 0, 0.3)" />
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
