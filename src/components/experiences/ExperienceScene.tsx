import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { cid } from '../../data/contentManifest'
import { withName } from '../../data/garden'
import type { Seed } from '../../data/types'
import { easeRise, easeSoft, stagger } from '../shared/motion'
import { SoftButton } from '../shared/SoftButton'
import { Bud } from '../flowers/Bud'
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
      {/*
        El jardín no se abandona al abrir una experiencia: asoma por los
        bordes. Sin esto, la pantalla se siente un documento y no un sitio.
      */}
      <div className="experience__edges" aria-hidden="true">
        <svg className="experience__edge experience__edge--top" viewBox="0 0 400 90" preserveAspectRatio="none">
          <path d="M0 0 C 60 34, 120 10, 180 38 C 240 64, 300 22, 360 44 C 380 52, 392 46, 400 40 L400 0 Z" fill="var(--c-leaf-soft)" opacity="0.16" />
          <path d="M0 0 C 48 22, 104 4, 158 26 C 214 48, 286 12, 342 30 C 370 40, 386 34, 400 28 L400 0 Z" fill="var(--c-leaf)" opacity="0.13" />
        </svg>
        <svg className="experience__edge experience__edge--bottom" viewBox="0 0 400 120" preserveAspectRatio="none">
          <path d="M0 120 L0 62 C 54 34, 108 74, 168 52 C 228 30, 286 72, 344 50 C 368 40, 386 46, 400 54 L400 120 Z" fill="var(--c-leaf-soft)" opacity="0.2" />
          <path d="M0 120 L0 88 C 60 66, 116 96, 176 80 C 236 64, 292 94, 350 78 C 372 72, 388 78, 400 84 L400 120 Z" fill="var(--c-leaf)" opacity="0.16" />
        </svg>
      </div>

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
              <Bud accent={seed.accent} size={40} />
            </motion.div>

            <motion.p
              className="experience__eyebrow u-eyebrow"
              data-cid={cid(`seeds.${seed.id}.experience.eyebrow`)}
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
              data-cid={cid(`seeds.${seed.id}.experience.title`)}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: easeRise, delay: 0.55 }}
            >
              {withName(experience.title)}
            </motion.h1>

            <motion.p
              className="experience__subtitle"
              data-cid={cid(`seeds.${seed.id}.experience.subtitle`)}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: easeRise, delay: 0.68 }}
            >
              {withName(experience.subtitle)}
            </motion.p>
          </motion.header>

          <div className="experience__blocks">
            {experience.blocks.map((block, index) => (
              <BlockRenderer key={index} block={block} seedId={seed.id} index={index} />
            ))}
          </div>

          <motion.footer
            className="experience__footer"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: easeRise, delay: 0.9 }}
          >
            {experience.closingWhisper && (
              <p
                className="experience__whisper u-serif"
                data-cid={cid(`seeds.${seed.id}.experience.closingWhisper`)}
              >
                {withName(experience.closingWhisper)}
              </p>
            )}
            <SoftButton
              variant="ghost"
              onClick={onClose}
              cid={cid(`seeds.${seed.id}.experience.backLabel`)}
            >
              <svg
                className="experience__back-leaf"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  d="M17 3 C 9 3, 3 8, 3 14 C 3 16, 4 17, 6 17 C 12 17, 17 11, 17 3 Z"
                  fill="currentColor"
                  opacity="0.55"
                />
                <path
                  d="M6 16 C 8 12, 11 8, 16 4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                  opacity="0.75"
                />
              </svg>
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
