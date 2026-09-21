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
        viewBox="0 0 34 26"
        width="26"
        height="20"
        animate={{ scaleX: [1, 0.42, 1] }}
        transition={{ duration: 0.34, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path d="M17 13 C 10 2, 1 3, 3 11 C 4 18, 12 18, 17 13 Z" fill="var(--c-rose)" opacity="0.86" />
        <path d="M17 13 C 24 2, 33 3, 31 11 C 30 18, 22 18, 17 13 Z" fill="var(--c-flower-soft)" opacity="0.86" />
        <path d="M17 11 L17 19" stroke="var(--c-earth-deep)" strokeWidth="1.4" strokeLinecap="round" />
      </motion.svg>
    </motion.div>
  )
}
