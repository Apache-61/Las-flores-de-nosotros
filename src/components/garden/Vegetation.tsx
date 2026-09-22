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
  kind: 'tuft' | 'blade'
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
      scale: 0.5 + depth * 0.9 + random() * 0.22,
      rotate: between(random, -13, 13),
      hue: random(),
      kind: random() < 0.72 ? 'tuft' : 'blade',
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

  /*
   * El campo es pasto y nada más. Cualquier planta alta competiría con
   * las semillas, que son lo único que tiene que llamar la atención
   * hasta que llegue el final.
   */
  if (kind === 'blade') {
    // Unas briznas sueltas, más finas y más bajas
    return (
      <svg viewBox="0 0 24 20" width="24" height="20">
        <g stroke={green} strokeWidth="1.5" fill="none" strokeLinecap="round">
          <path d="M12 20 C 10 15, 8 10, 5 6" />
          <path d="M12 20 C 12 14, 12 9, 12 4" />
          <path d="M12 20 C 14 15, 17 11, 20 8" />
        </g>
      </svg>
    )
  }

  // Una mata de pasto
  return (
    <svg viewBox="0 0 34 24" width="34" height="24">
      <g stroke={green} strokeWidth="1.9" fill="none" strokeLinecap="round">
        <path d="M17 24 C 14 18, 11 12, 7 8" />
        <path d="M17 24 C 17 17, 16 11, 15 5" />
        <path d="M17 24 C 20 18, 24 13, 28 9" />
      </g>
      <g stroke={green} strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.72">
        <path d="M17 24 C 19 19, 22 16, 25 14" />
        <path d="M17 24 C 15 19, 12 16, 9 14" />
      </g>
    </svg>
  )
}
