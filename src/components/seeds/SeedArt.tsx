import { motion } from 'framer-motion'
import { memo, useMemo } from 'react'
import { createRandom } from '../../lib/random'
import { easeRise } from '../shared/motion'

interface SeedArtProps {
  accent: string
  /** La semilla activa deja asomar un brote diminuto. */
  sprouting: boolean
  /** Cada número da una semilla distinta: ninguna es igual a otra. */
  variant?: number
  /** La última semilla guarda algo dentro y se nota. */
  special?: boolean
  size?: number
}

/**
 * La semilla sin abrir: un cuerpo de tierra, un brillo tenue y,
 * cuando está invitando a ser descubierta, un brote que asoma.
 *
 * Ninguna semilla es idéntica a otra: cambian de forma, de inclinación
 * y de veta. Seis copias del mismo dibujo se notarían enseguida.
 */
export const SeedArt = memo(function SeedArt({
  accent,
  sprouting,
  variant = 0,
  special = false,
  size = 66,
}: SeedArtProps) {
  const shape = useMemo(() => {
    const random = createRandom(variant * 613 + 29)
    return {
      /** Redondez del cuerpo. */
      rx: 17 + random() * 4.5,
      ry: 14 + random() * 3,
      tilt: (random() - 0.5) * 14,
      /** La veta clara de la cáscara. */
      vein: 0.35 + random() * 0.3,
      shine: random() * 6 - 3,
    }
  }, [variant])

  return (
    <svg
      viewBox="0 0 60 78"
      width={size}
      height={size * (78 / 60)}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`seed-body-${variant}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8a6644" />
          <stop offset="58%" stopColor="#5d4430" />
          <stop offset="100%" stopColor="var(--c-earth-deep)" />
        </linearGradient>
      </defs>

      {/* brote: dos hojas que asoman por encima de la semilla */}
      <motion.g
        initial={false}
        animate={{ opacity: sprouting ? 1 : 0, y: sprouting ? 0 : 6 }}
        transition={{ duration: 0.9, ease: easeRise }}
        style={{ transformOrigin: '30px 44px' }}
      >
        <path
          d="M30 44 C 30 34, 30 26, 30 20"
          fill="none"
          stroke="var(--c-leaf-deep)"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M30 28 C 21 26, 16 19, 17 12 C 25 13, 29 20, 30 28 Z"
          fill="var(--c-leaf)"
        />
        <path
          d="M30 24 C 39 22, 44 16, 43 9 C 35 10, 31 16, 30 24 Z"
          fill="var(--c-leaf-soft)"
        />
        {/* La última semilla asoma un capullo cerrado: guarda algo dentro */}
        {special && (
          <g>
            <ellipse cx="30" cy="12" rx="5" ry="8" fill={accent} opacity="0.9" />
            <ellipse cx="30" cy="14" rx="3" ry="5.4" fill="var(--c-flower-deep)" opacity="0.5" />
          </g>
        )}
      </motion.g>

      {/* cuerpo de la semilla */}
      <g transform={`rotate(${shape.tilt} 30 56)`}>
        <ellipse
          cx="30"
          cy="56"
          rx={shape.rx}
          ry={shape.ry}
          fill={`url(#seed-body-${variant})`}
        />
        <path
          d={`M${30 - shape.rx * 0.5} 53 C 26 50, 34 50, ${30 + shape.rx * 0.5} 53`}
          fill="none"
          stroke={accent}
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity={shape.vein}
        />
        <ellipse
          cx={27 + shape.shine}
          cy="52"
          rx="4.4"
          ry="2.8"
          fill="var(--c-cream-warm)"
          opacity="0.18"
        />
      </g>

      {/* sombra sobre la tierra */}
      <ellipse cx="30" cy="71" rx={shape.rx * 0.95} ry="3.2" fill="rgba(35, 22, 12, 0.36)" />
    </svg>
  )
})
