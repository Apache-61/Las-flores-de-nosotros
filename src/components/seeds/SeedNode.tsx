import { motion, useReducedMotion } from 'framer-motion'
import { useCallback, useRef, useState } from 'react'
import type { Seed, SeedStatus } from '../../data/types'
import { depthToOpacity, depthToParallax, depthToScale } from '../../lib/stage'
import { breathing, easeRise } from '../shared/motion'
import { GardenFlower } from '../flowers/GardenFlower'
import { SeedArt } from './SeedArt'
import './SeedNode.css'

interface SeedNodeProps {
  seed: Seed
  status: SeedStatus
  index: number
  isPortrait: boolean
  /** Paralaje del cursor, en valores -1…1. */
  pointer: { x: number; y: number }
  /** true si acaba de descubrirse: la flor nace en vez de estar ya abierta. */
  justBloomed: boolean
  onSelect: (seed: Seed, origin: { x: number; y: number }) => void
}

const statusHint: Record<SeedStatus, string> = {
  undiscovered: 'sin descubrir',
  active: 'esperando a ser descubierta',
  opening: 'abriéndose',
  discovered: 'ya descubierta',
  final: 'ya descubierta',
}

/**
 * Una semilla del jardín.
 *
 * Es un elemento vivo, no un botón: respira, reacciona al cursor y,
 * cuando está activa, emite una onda muy tenue. Al descubrirse deja de
 * ser semilla y se convierte en flor, y esa flor se queda ahí para
 * siempre — el jardín recuerda.
 */
export function SeedNode({
  seed,
  status,
  index,
  isPortrait,
  pointer,
  justBloomed,
  onSelect,
}: SeedNodeProps) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLButtonElement>(null)
  const [hovered, setHovered] = useState(false)

  const { depth } = seed.placement
  const position = isPortrait ? seed.placement.portrait : seed.placement.landscape
  const scale = depthToScale(depth, seed.placement.scale ?? 1)
  const parallax = depthToParallax(depth)

  const isBloomed = status === 'discovered' || status === 'final'
  const isActive = status === 'active'
  const isOpening = status === 'opening'
  const isLastSeed = seed.kind === 'final'
  // La última semilla no se abre: estalla. Crece mucho más que las otras.
  const openScale = isLastSeed ? 2.1 : 1.55
  const openDuration = isLastSeed ? 1.3 : 0.6

  const handleSelect = useCallback(() => {
    const rect = ref.current?.getBoundingClientRect()
    const origin = rect
      ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
      : { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    onSelect(seed, origin)
  }, [onSelect, seed])

  return (
    <motion.button
      ref={ref}
      type="button"
      data-seed-id={seed.id}
      className={`seed-node seed-node--${status}`}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        zIndex: isOpening ? 60 : 10 + Math.round(depth * 10),
        ['--seed-accent' as string]: seed.accent,
        opacity: depthToOpacity(depth),
      }}
      aria-label={`${seed.ariaLabel}: ${seed.label} — ${statusHint[status]}`}
      onClick={handleSelect}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      initial={{ opacity: 0, y: 26, scale: 0.6 }}
      animate={{
        opacity: depthToOpacity(depth),
        y: reduced ? 0 : pointer.y * parallax,
        x: reduced ? 0 : pointer.x * parallax,
        scale: isOpening ? openScale : 1,
      }}
      transition={{
        opacity: { duration: 1.1, ease: easeRise, delay: 0.25 + index * 0.13 },
        scale: {
          duration: isOpening ? openDuration : 1.1,
          ease: easeRise,
          delay: isOpening ? 0 : 0.25 + index * 0.13,
        },
        x: { duration: 1.6, ease: easeRise },
        y: { duration: 1.6, ease: easeRise },
      }}
      whileTap={{ scale: 0.92 }}
    >
      {/* Onda de invitación: sólo en la semilla activa */}
      {isActive && !reduced && (
        <>
          <motion.span
            className="seed-node__ripple"
            aria-hidden="true"
            animate={{ scale: [0.7, 1.9], opacity: [0.42, 0] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: 'easeOut' }}
          />
          <motion.span
            className="seed-node__ripple"
            aria-hidden="true"
            animate={{ scale: [0.7, 1.9], opacity: [0.42, 0] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: 'easeOut', delay: 1.7 }}
          />
        </>
      )}

      {/* Unas motas suben despacio desde la semilla que quiere ser descubierta */}
      {isActive && !reduced && (
        <span className="seed-node__motes" aria-hidden="true">
          {[0, 1, 2].map((mote) => (
            <motion.span
              key={mote}
              className="seed-node__mote"
              style={{ left: `${44 + mote * 6}%` }}
              animate={{ y: [6, -46], x: [0, mote === 1 ? 7 : -6], opacity: [0, 0.75, 0] }}
              transition={{
                duration: 4.4,
                repeat: Infinity,
                delay: mote * 1.5,
                ease: 'easeOut',
              }}
            />
          ))}
        </span>
      )}

      {/* Luz ambiental alrededor de la semilla activa o enfocada */}
      <motion.span
        className="seed-node__glow"
        aria-hidden="true"
        animate={{
          opacity: isOpening ? 1 : isActive ? [0.32, 0.66, 0.32] : hovered ? 0.45 : 0,
          scale: isOpening ? (isLastSeed ? 6.5 : 2.6) : isActive ? [1, 1.14, 1] : 1,
        }}
        transition={
          isOpening
            ? { duration: openDuration, ease: easeRise }
            : isActive && !reduced
              ? { duration: 4.2, repeat: Infinity, ease: 'easeInOut' }
              : { duration: 0.5 }
        }
      />

      <motion.span
        className="seed-node__art"
        style={{ scale }}
        animate={
          isOpening && isLastSeed && !reduced
            ? // Un temblor contenido justo antes de desbordarse
              {
                rotate: [0, -2.2, 2, -1.4, 0.8, 0],
                transition: { duration: openDuration, ease: 'easeInOut' },
              }
            : isBloomed || reduced
              ? {}
              : breathing(isActive ? depth + 0.5 : depth, Boolean(reduced))
        }
      >
        {isBloomed ? (
          <GardenFlower
            accent={seed.accent}
            scale={1 + depth * 0.36}
            variant={index + 1}
            petals={seed.kind === 'final' ? 10 : 8}
            justBloomed={justBloomed}
          />
        ) : (
          <SeedArt
            accent={seed.accent}
            /* La última semilla siempre asoma su capullo: es la única que
               ya tiene algo dentro, y eso se tiene que ver sin explicarlo. */
            sprouting={isLastSeed || isActive || hovered || isOpening}
            variant={index}
            special={isLastSeed}
            size={isLastSeed ? 72 : 66}
          />
        )}
      </motion.span>

      {/*
        El nombre aparece sólo al posarse encima o al llegar con el teclado.
        La semilla activa no lo enseña: invita con luz, no con una etiqueta.
        En el teléfono no hay ratón, así que el jardín se recorre tocando,
        que es justo lo que queremos que pase.
      */}
      <motion.span
        className={
          // La flor crece hacia arriba, así que su nombre va arriba con ella.
          isBloomed || position.y > (isPortrait ? 74 : 58)
            ? 'seed-node__label seed-node__label--above'
            : 'seed-node__label'
        }
        aria-hidden="true"
        initial={false}
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
        transition={{ duration: 0.45, ease: easeRise }}
      >
        <span className="seed-node__label-title">{seed.label}</span>
        <span className="seed-node__label-sub">{seed.subtitle}</span>
      </motion.span>
    </motion.button>
  )
}
