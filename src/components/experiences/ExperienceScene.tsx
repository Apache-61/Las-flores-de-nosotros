import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { withName } from '../../data/garden'
import type { Seed } from '../../data/types'
import { easeRise, easeSoft, stagger } from '../shared/motion'
import { SoftButton } from '../shared/SoftButton'
import { FlowerHead } from '../flowers/FlowerHead'
import { BlockRenderer } from './ExperienceBlocks'
import './ExperienceScene.css'

interface ExperienceSceneProps {
  seed: Seed
  onClose: () => void
}

/**
 * Una de las cinco experiencias.
 *
 * No es un modal: es una pantalla que nace de la luz de la semilla y
 * conserva el aire del jardín (mismos colores, misma tipografía, una
 * flor arriba como recuerdo de lo que acaba de abrirse).
 *
 * El contenido lo construye la lista de bloques de src/data/garden.ts,
 * así que esta pantalla sirve igual para una carta, unas fotos o un mapa.
 */
export function ExperienceScene({ seed, onClose }: ExperienceSceneProps) {
  const reduced = useReducedMotion()
  const scrollRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const experience = seed.experience

  // Al abrirse, el foco viaja al título: quien navegue con teclado o
  // lector de pantalla llega al sitio correcto, no al final del jardín.
  useEffect(() => {
    const timer = window.setTimeout(() => headingRef.current?.focus(), 420)
    return () => window.clearTimeout(timer)
  }, [])

  // Escape devuelve al jardín
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!experience) return null

  return (
    <motion.section
      className="experience"
      role="dialog"
      aria-modal="true"
      aria-labelledby="experience-title"
      style={{ ['--experience-accent' as string]: seed.accent }}
      initial={{ opacity: 0, scale: reduced ? 1 : 1.06 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{
        opacity: 0,
        scale: reduced ? 1 : 0.94,
        transition: { duration: 0.55, ease: easeSoft },
      }}
      transition={{ duration: 0.85, ease: easeRise, delay: 0.12 }}
    >
      <div className="experience__scroll" ref={scrollRef}>
        <motion.article
          className="experience__content"
          variants={stagger(0.45, 0.14)}
          initial="hidden"
          animate="visible"
        >
          <motion.header className="experience__header">
            <motion.div
              className="experience__crest"
              aria-hidden="true"
              initial={{ scale: 0, rotate: -30, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: easeRise, delay: 0.3 }}
            >
              <FlowerHead accent={seed.accent} petals={8} variant={7} size={58} />
            </motion.div>

            <motion.p
              className="experience__eyebrow u-eyebrow"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: easeRise, delay: 0.45 }}
            >
              {withName(experience.eyebrow)}
            </motion.p>

            <motion.h1
              id="experience-title"
              ref={headingRef}
              tabIndex={-1}
              className="experience__title u-serif"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: easeRise, delay: 0.55 }}
            >
              {withName(experience.title)}
            </motion.h1>

            <motion.p
              className="experience__subtitle"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: easeRise, delay: 0.68 }}
            >
              {withName(experience.subtitle)}
            </motion.p>
          </motion.header>

          <div className="experience__blocks">
            {experience.blocks.map((block, index) => (
              <BlockRenderer key={index} block={block} seedId={seed.id} />
            ))}
          </div>

          <motion.footer
            className="experience__footer"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: easeRise, delay: 0.9 }}
          >
            {experience.closingWhisper && (
              <p className="experience__whisper u-serif">
                {withName(experience.closingWhisper)}
              </p>
            )}
            <SoftButton variant="ghost" onClick={onClose}>
              {experience.backLabel}
            </SoftButton>
          </motion.footer>
        </motion.article>
      </div>

      {/* Salida siempre visible, sin tapar el contenido */}
      <motion.button
        type="button"
        className="experience__close"
        onClick={onClose}
        aria-label={experience.backLabel}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.7 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
      >
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path
            d="M14.5 5.5 L8 12l6.5 6.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.button>
    </motion.section>
  )
}
