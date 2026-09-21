import { motion, useReducedMotion } from 'framer-motion'
import { memo, useMemo } from 'react'
import { gardenSettings } from '../../data/garden'
import { between, createRandom } from '../../lib/random'
import { easeRise } from '../shared/motion'
import './Vegetation.css'

interface Sprig {
  id: number
  x: number
  y: number
  scale: number
  rotate: number
  hue: number
  kind: 'tuft' | 'leaf' | 'sprig'
  /** A partir de qué nivel de crecimiento aparece (0–1). */
  threshold: number
  delay: number
  sway: number
}

/**
 * La vegetación de fondo.
 *
 * Se genera una sola vez con posiciones fijas (no cambian entre renders)
 * y cada mata tiene un umbral: cuanto más descubre el jardín, más
 * vegetación aparece. Al principio hay poca; al final, está lleno de vida.
 */
function buildSprigs(count: number): Sprig[] {
  const random = createRandom(20240214)
  return Array.from({ length: count }, (_, id) => {
    const y = between(random, 44, 99)
    // Lo que está más abajo está más cerca: se dibuja más grande
    const depth = (y - 44) / 55
    return {
      id,
      x: between(random, -4, 104),
      y,
      scale: 0.66 + depth * 1.5 + random() * 0.3,
      rotate: between(random, -13, 13),
      hue: random(),
      kind: random() < 0.54 ? 'tuft' : random() < 0.78 ? 'leaf' : 'sprig',
      threshold: random() * 0.98,
      delay: random() * 0.8,
      sway: 3.8 + random() * 3.4,
    }
  })
}

export const Vegetation = memo(function Vegetation({
  growth,
  density,
  size,
}: {
  growth: number
  density: number
  size: number
}) {
  const reduced = useReducedMotion()
  const sprigs = useMemo(
    () => buildSprigs(Math.round(72 * gardenSettings.foliageDensity * density)),
    [density],
  )

  return (
    <div className="vegetation" aria-hidden="true">
      {sprigs.map((sprig) => {
        // Un tercio de la vegetación existe desde el principio
        const visible = sprig.threshold <= 0.32 + growth * 0.68
        if (!visible) return null
        return (
          <motion.span
            key={sprig.id}
            className={`vegetation__sprig vegetation__sprig--${sprig.kind}`}
            style={{
              left: `${sprig.x}%`,
              top: `${sprig.y}%`,
              zIndex: Math.round(sprig.y),
            }}
            initial={{ opacity: 0, scaleY: 0.2 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ duration: 1.3, ease: easeRise, delay: sprig.delay }}
          >
            <motion.span
              className="vegetation__inner"
              style={{ scale: sprig.scale * (1 + (size - 1) * 0.45), rotate: sprig.rotate }}
              animate={
                reduced
                  ? {}
                  : {
                      rotate: [sprig.rotate - 2.4, sprig.rotate + 2.4, sprig.rotate - 2.4],
                    }
              }
              transition={{
                duration: sprig.sway,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: sprig.delay,
              }}
            >
              <SprigArt kind={sprig.kind} hue={sprig.hue} />
            </motion.span>
          </motion.span>
        )
      })}
    </div>
  )
})

function SprigArt({ kind, hue }: { kind: Sprig['kind']; hue: number }) {
  const green = hue < 0.4 ? 'var(--c-leaf-deep)' : hue < 0.78 ? 'var(--c-leaf)' : 'var(--c-leaf-soft)'

  if (kind === 'leaf') {
    return (
      <svg viewBox="0 0 30 34" width="30" height="34">
        <path d="M15 34 C 13 24, 13 14, 15 4" stroke={green} strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <path d="M15 22 C 5 20, 1 12, 3 5 C 11 7, 14 15, 15 22 Z" fill={green} opacity="0.9" />
        <path d="M15 17 C 25 15, 29 8, 27 2 C 19 4, 16 11, 15 17 Z" fill={green} opacity="0.72" />
      </svg>
    )
  }

  if (kind === 'sprig') {
    // Un tallo tierno, sin nada abierto en la punta
    return (
      <svg viewBox="0 0 26 38" width="26" height="38">
        <path d="M13 38 C 11 28, 11 18, 13 9" stroke={green} strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <path d="M13 24 C 7 22, 4 17, 5 12 C 10 14, 12 19, 13 24 Z" fill={green} opacity="0.85" />
        <path d="M13 18 C 19 16, 22 11, 21 6 C 16 8, 14 13, 13 18 Z" fill={green} opacity="0.7" />
        <path d="M13 9 C 11 7, 11 4, 13 2 C 15 4, 15 7, 13 9 Z" fill={green} opacity="0.9" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 38 32" width="38" height="32">
      {/* hojas anchas al fondo, para que la mata tenga cuerpo */}
      <g fill={green} opacity="0.55">
        <path d="M19 32 C 12 24, 7 15, 4 7 C 11 11, 16 21, 19 32 Z" />
        <path d="M19 32 C 26 24, 31 16, 34 8 C 27 12, 22 21, 19 32 Z" />
      </g>
      <g stroke={green} strokeWidth="2.1" fill="none" strokeLinecap="round">
        <path d="M19 32 C 15 23, 11 15, 6 10" />
        <path d="M19 32 C 19 22, 18 13, 17 5" />
        <path d="M19 32 C 23 23, 27 16, 32 11" />
      </g>
      <g stroke={green} strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.72">
        <path d="M19 32 C 21 25, 24 21, 27 19" />
        <path d="M19 32 C 17 25, 14 21, 11 19" />
        <path d="M19 32 C 20 24, 21 17, 23 9" />
      </g>
    </svg>
  )
}
