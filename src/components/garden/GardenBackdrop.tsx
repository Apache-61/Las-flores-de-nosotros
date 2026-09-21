import { motion, useReducedMotion } from 'framer-motion'
import { memo } from 'react'
import './GardenBackdrop.css'

interface GardenBackdropProps {
  /** 0 = jardín recién nacido, 1 = jardín lleno de vida. */
  growth: number
  pointer: { x: number; y: number }
}

/**
 * El fondo del jardín: cielo, luz, colinas y tierra.
 * A medida que el jardín crece, la luz se vuelve un poco más dorada
 * y las colinas más verdes: el mundo entero responde al descubrimiento.
 */
export const GardenBackdrop = memo(function GardenBackdrop({
  growth,
  pointer,
}: GardenBackdropProps) {
  const reduced = useReducedMotion()

  return (
    <div className="garden-backdrop" aria-hidden="true">
      <div className="garden-backdrop__sky" />

      {/* El sol: la fuente de luz de toda la escena */}
      <motion.div
        className="garden-backdrop__sun"
        animate={
          reduced
            ? { opacity: 0.55 + growth * 0.25 }
            : {
                opacity: [0.45 + growth * 0.2, 0.68 + growth * 0.22, 0.45 + growth * 0.2],
                scale: [1, 1.05, 1],
              }
        }
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Tres nubes muy lentas: el cielo tiene que respirar él también */}
      {!reduced && (
        <div className="garden-backdrop__clouds">
          {[
            { top: '9%', size: 46, duration: 132, delay: 0, opacity: 0.5 },
            { top: '17%', size: 30, duration: 176, delay: -60, opacity: 0.36 },
            { top: '4%', size: 62, duration: 214, delay: -130, opacity: 0.28 },
          ].map((cloud, index) => (
            <motion.span
              key={index}
              className="garden-backdrop__cloud"
              style={{
                top: cloud.top,
                width: `${cloud.size}vw`,
                height: `${cloud.size * 0.26}vw`,
                opacity: cloud.opacity,
              }}
              initial={{ x: '-40vw' }}
              animate={{ x: '140vw' }}
              transition={{
                duration: cloud.duration,
                delay: cloud.delay,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          ))}
        </div>
      )}

      <motion.svg
        className="garden-backdrop__hills"
        viewBox="0 0 1200 520"
        preserveAspectRatio="none"
        animate={{ x: reduced ? 0 : pointer.x * -8 }}
        transition={{ duration: 1.8, ease: [0.16, 0.84, 0.34, 1] }}
      >
        {/* colinas lejanas */}
        <path
          d="M-60 34 C 180 -14, 330 40, 520 14 C 700 -10, 860 38, 1040 6 C 1130 -10, 1200 8, 1260 -2 L1260 520 L-60 520 Z"
          fill="var(--c-hill-far)"
          opacity={0.82 + growth * 0.12}
        />
        {/* campo medio */}
        <path
          d="M-60 138 C 150 92, 310 142, 500 116 C 690 90, 880 144, 1060 112 C 1150 96, 1210 116, 1260 106 L1260 520 L-60 520 Z"
          fill="var(--c-hill-mid)"
          opacity={0.9 + growth * 0.1}
        />
        {/* pradera */}
        <path
          d="M-60 252 C 120 214, 250 262, 420 238 C 600 212, 760 264, 940 236 C 1080 214, 1180 246, 1260 230 L1260 520 L-60 520 Z"
          fill="var(--c-hill-near)"
        />
        {/* primer plano */}
        <path
          d="M-60 388 C 160 352, 320 396, 520 374 C 720 352, 900 398, 1080 372 C 1160 360, 1220 378, 1260 368 L1260 520 L-60 520 Z"
          fill="var(--c-hill-fore)"
        />
      </motion.svg>

      <div className="garden-backdrop__ground" />
      <div className="garden-backdrop__sunlight" />
      <div className="garden-backdrop__haze" />
      <div className="garden-backdrop__vignette" />
    </div>
  )
})
