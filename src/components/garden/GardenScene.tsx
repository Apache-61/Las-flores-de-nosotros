import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { cid } from '../../data/contentManifest'
import { gardenContent, seeds, withName } from '../../data/garden'
import type { Seed } from '../../data/types'
import type { GardenProgress } from '../../hooks/useGardenProgress'
import { usePointerParallax } from '../../hooks/usePointerParallax'
import { useStageLayout } from '../../hooks/useStageLayout'
import { easeRise } from '../shared/motion'
import { SeedNode } from '../seeds/SeedNode'
import { Atmosphere } from './Atmosphere'
import { GardenBackdrop } from './GardenBackdrop'
import { Vegetation } from './Vegetation'
import './GardenScene.css'

interface GardenSceneProps {
  progress: GardenProgress
  onSelectSeed: (seed: Seed, origin: { x: number; y: number }) => void
  /**
   * Qué está pasando por encima del jardín:
   *  - 'live'       el jardín es la escena.
   *  - 'experience' hay una experiencia abierta: el jardín espera detrás,
   *                 con la cámara acercada a la semilla que se abrió.
   *  - 'final'      empieza la escena final: el jardín NO se difumina,
   *                 porque la semilla tiene que reaccionar a la vista.
   */
  mode: 'live' | 'experience' | 'final'
  /** Punto hacia el que se acercó la cámara al abrir una semilla. */
  focusPoint: { x: number; y: number } | null
}

/**
 * EL JARDÍN.
 *
 * Es la pantalla que sostiene todo el proyecto. Las semillas no viven
 * en una cuadrícula: están plantadas en sitios concretos del terreno
 * (ver `placement` en src/data/garden.ts) y el jardín entero crece a
 * medida que ella descubre cada una.
 *
 * Cuando se abre una experiencia el jardín no se desmonta: se queda
 * detrás, con la cámara acercada hacia la semilla abierta. Por eso al
 * volver todo sigue exactamente donde estaba.
 */
export function GardenScene({
  progress,
  onSelectSeed,
  mode,
  focusPoint,
}: GardenSceneProps) {
  const isBackground = mode !== 'live'
  const isFinal = mode === 'final'
  const layout = useStageLayout()
  const reduced = useReducedMotion()
  const pointer = usePointerParallax(!layout.isTouch && !isBackground)
  const [showWelcome, setShowWelcome] = useState(true)

  // La bienvenida se deja ver un momento y se retira sola
  useEffect(() => {
    const timer = window.setTimeout(() => setShowWelcome(false), 5200)
    return () => window.clearTimeout(timer)
  }, [])

  const origin = focusPoint
    ? `${focusPoint.x}px ${focusPoint.y}px`
    : '50% 50%'

  const hintPath = progress.finalSeen
    ? 'gardenContent.garden.completed'
    : progress.isFinalReady
      ? 'gardenContent.garden.readyForFinal'
      : 'gardenContent.garden.hint'
  const hint = progress.finalSeen
    ? gardenContent.garden.completed
    : progress.isFinalReady
      ? gardenContent.garden.readyForFinal
      : gardenContent.garden.hint

  return (
    <motion.div
      className="garden"
      // Mientras hay una experiencia encima, el jardín no recibe foco
      inert={isBackground || undefined}
      aria-hidden={isBackground || undefined}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: easeRise }}
    >
      <motion.div
        className="garden__stage"
        style={{ transformOrigin: origin }}
        animate={{
          // En el final la cámara sólo se acerca un poco y nada se difumina:
          // lo que va a tapar el jardín es la propia explosión de flores.
          scale: isFinal ? (reduced ? 1 : 1.08) : isBackground ? (reduced ? 1 : 1.22) : 1,
          opacity: isFinal ? 1 : isBackground ? 0.5 : 1,
          filter: isBackground && !isFinal ? 'blur(7px)' : 'blur(0px)',
        }}
        transition={{ duration: isFinal ? 2.4 : 1.1, ease: easeRise }}
      >
        <GardenBackdrop growth={progress.growth} pointer={pointer} />
        <Vegetation
          growth={progress.growth}
          density={layout.densityScale}
          size={layout.sizeScale}
        />

        <div className="garden__seeds">
          {seeds.map((seed, index) => (
            <SeedNode
              key={seed.id}
              seed={seed}
              index={index}
              status={progress.statusOf(seed.id)}
              isPortrait={layout.isPortrait}
              sizeScale={layout.sizeScale}
              justBloomed={progress.lastDiscovered === seed.id}
              onSelect={onSelectSeed}
            />
          ))}
        </div>

        <Atmosphere compact={layout.isCompact} />
      </motion.div>

      {/* ── Capa de texto: mínima, para no convertir el jardín en una interfaz ── */}
      <div className="garden__overlay">
        <AnimatePresence>
          {showWelcome && !isBackground && (
            <motion.p
              key="welcome"
              className="garden__welcome u-serif"
              data-cid={cid('gardenContent.garden.welcome')}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 1.4, ease: easeRise }}
            >
              {withName(gardenContent.garden.welcome)}
            </motion.p>
          )}
        </AnimatePresence>

        <motion.div
          className="garden__foot"
          animate={{ opacity: isBackground ? 0 : 1 }}
          transition={{ duration: 0.6 }}
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={hint}
              className="garden__hint"
              data-cid={cid(hintPath)}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 0.78, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.9, ease: easeRise }}
            >
              {withName(hint)}
            </motion.p>
          </AnimatePresence>

          {/*
            El progreso no se enseña con un marcador: se ve en el jardín,
            que cada vez tiene más flores. El número queda sólo para quien
            navegue con lector de pantalla.
          */}
          <p className="u-visually-hidden" aria-live="polite">
            {progress.discoveredCount + (progress.finalSeen ? 1 : 0)} de{' '}
            {progress.totalSeeds} {gardenContent.garden.progressLabel}
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}
