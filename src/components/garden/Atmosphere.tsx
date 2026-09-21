import { motion, useReducedMotion } from 'framer-motion'
import { memo, useMemo } from 'react'
import { gardenSettings } from '../../data/garden'
import { between, createRandom } from '../../lib/random'
import './Atmosphere.css'

/**
 * Polen flotando y una mariposa ocasional.
 * Son pocos elementos a propósito: lo justo para que el aire del jardín
 * se sienta vivo sin cargar el móvil.
 */
export const Atmosphere = memo(function Atmosphere({ compact }: { compact: boolean }) {
  const reduced = useReducedMotion()
  const count = reduced
    ? 0
    : Math.round(gardenSettings.particleCount * (compact ? 0.6 : 1))

  const motes = useMemo(() => {
    const random = createRandom(7781)
    return Array.from({ length: count }, (_, id) => ({
      id,
      x: between(random, 2, 98),
      y: between(random, 38, 96),
      size: between(random, 2.5, 6),
      drift: between(random, -42, 42),
      rise: between(random, 70, 190),
      duration: between(random, 13, 26),
      delay: between(random, 0, 14),
      opacity: between(random, 0.22, 0.6),
    }))
  }, [count])

  return (
    <div className="atmosphere" aria-hidden="true">
      {motes.map((mote) => (
        <motion.span
          key={mote.id}
          className="atmosphere__mote"
          style={{
            left: `${mote.x}%`,
            top: `${mote.y}%`,
            width: mote.size,
            height: mote.size,
          }}
          initial={{ opacity: 0, y: 0, x: 0 }}
          animate={{
            opacity: [0, mote.opacity, mote.opacity, 0],
            y: [0, -mote.rise],
            x: [0, mote.drift],
          }}
          transition={{
            duration: mote.duration,
            delay: mote.delay,
            repeat: Infinity,
            ease: 'easeInOut',
            times: [0, 0.2, 0.75, 1],
          }}
        />
      ))}

      {gardenSettings.butterfly && !reduced && <Butterfly />}
    </div>
  )
})

/** Una mariposa que cruza el jardín de vez en cuando. */
function Butterfly() {
  return (
    <motion.div
      className="atmosphere__butterfly"
      initial={{ x: '-12vw', y: '62vh', opacity: 0 }}
      animate={{
        x: ['-12vw', '26vw', '58vw', '86vw', '112vw'],
        y: ['62vh', '48vh', '58vh', '42vh', '50vh'],
        opacity: [0, 0.9, 0.9, 0.85, 0],
      }}
      transition={{
        duration: 26,
        times: [0, 0.22, 0.5, 0.78, 1],
        repeat: Infinity,
        repeatDelay: 22,
        ease: 'easeInOut',
        delay: 6,
      }}
    >
      <motion.svg
        viewBox="0 0 40 30"
        width="36"
        height="27"
        animate={{ scaleX: [1, 0.36, 1] }}
        transition={{ duration: 0.38, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* alas traseras */}
        <path d="M20 16 C 13 22, 4 24, 4 17 C 4 12, 13 12, 20 16 Z" fill="var(--c-rose)" opacity="0.7" />
        <path d="M20 16 C 27 22, 36 24, 36 17 C 36 12, 27 12, 20 16 Z" fill="var(--c-flower-soft)" opacity="0.7" />
        {/* alas delanteras */}
        <path d="M20 15 C 12 4, 2 3, 3 11 C 4 18, 13 19, 20 15 Z" fill="var(--c-rose)" opacity="0.92" />
        <path d="M20 15 C 28 4, 38 3, 37 11 C 36 18, 27 19, 20 15 Z" fill="var(--c-flower-soft)" opacity="0.92" />
        {/* cuerpo y antenas */}
        <path d="M20 10 L20 21" stroke="var(--c-earth-deep)" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M20 10 C 18 7, 16 6, 15 6 M20 10 C 22 7, 24 6, 25 6" stroke="var(--c-earth-deep)" strokeWidth="0.9" fill="none" strokeLinecap="round" />
      </motion.svg>
    </motion.div>
  )
}
