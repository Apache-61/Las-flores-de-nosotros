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
        zIndex: 10 + Math.round(depth * 10),
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
        scale: isOpening ? 1.55 : 1,
      }}
      transition={{
        opacity: { duration: 1.1, ease: easeRise, delay: 0.25 + index * 0.13 },
        scale: { duration: isOpening ? 0.6 : 1.1, ease: easeRise, delay: isOpening ? 0 : 0.25 + index * 0.13 },
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

      {/* Luz ambiental alrededor de la semilla activa o enfocada */}
      <motion.span
        className="seed-node__glow"
        aria-hidden="true"
        animate={{
          opacity: isActive ? [0.3, 0.62, 0.3] : hovered ? 0.4 : 0,
          scale: isActive ? [1, 1.12, 1] : 1,
        }}
        transition={
          isActive && !reduced
            ? { duration: 4.2, repeat: Infinity, ease: 'easeInOut' }
            : { duration: 0.5 }
        }
      />

      <motion.span
        className="seed-node__art"
        style={{ scale }}
        animate={isBloomed || reduced ? {} : breathing(isActive ? depth + 0.5 : depth, Boolean(reduced))}
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
          <SeedArt accent={seed.accent} sprouting={isActive || hovered} />
        )}
      </motion.span>

      {/* El nombre sólo aparece cuando se la mira: el jardín no es un menú.
          La semilla activa lo insinúa a media luz. */}
      <motion.span
        className={
          position.y > (isPortrait ? 76 : 60)
            ? 'seed-node__label seed-node__label--above'
            : 'seed-node__label'
        }
        aria-hidden="true"
        initial={false}
        animate={{
          opacity: hovered ? 1 : isActive ? 0.62 : 0,
          y: hovered || isActive ? 0 : 6,
        }}
        transition={{ duration: 0.45, ease: easeRise }}
      >
        <span className="seed-node__label-title">{seed.label}</span>
        <span className="seed-node__label-sub">{seed.subtitle}</span>
      </motion.span>
    </motion.button>
  )
}
