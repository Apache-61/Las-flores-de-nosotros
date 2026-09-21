import { motion } from 'framer-motion'
import { memo } from 'react'
import { easeRise } from '../shared/motion'

interface SeedArtProps {
  accent: string
  /** La semilla activa deja asomar un brote diminuto. */
  sprouting: boolean
  size?: number
}

/**
 * La semilla sin abrir: un cuerpo de tierra, un brillo tenue y,
 * cuando está invitando a ser descubierta, un brote que asoma.
 */
export const SeedArt = memo(function SeedArt({
  accent,
  sprouting,
  size = 66,
}: SeedArtProps) {
  return (
    <svg
      viewBox="0 0 60 78"
      width={size}
      height={size * (78 / 60)}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="seed-body" x1="0" y1="0" x2="1" y2="1">
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
      </motion.g>

      {/* cuerpo de la semilla */}
      <path
        d="M30 42 C 15 42, 8 52, 12 62 C 16 72, 44 72, 48 62 C 52 52, 45 42, 30 42 Z"
        fill="url(#seed-body)"
      />
      <path
        d="M22 50 C 26 47, 34 47, 38 50"
        fill="none"
        stroke={accent}
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.5"
      />
      <ellipse cx="24" cy="53" rx="4.4" ry="3" fill="var(--c-cream-warm)" opacity="0.16" />

      {/* sombra sobre la tierra */}
      <ellipse cx="30" cy="72" rx="16" ry="3.4" fill="rgba(35, 22, 12, 0.4)" />
    </svg>
  )
})
