import { motion } from 'framer-motion'
import { useAudio } from '../../audio/AudioProvider'
import { audioLabels } from '../../data/audio'
import './SoundToggle.css'

/**
 * Interruptor de sonido. Permanece invisible mientras no haya ninguna
 * pista configurada en src/data/audio.ts, para no ensuciar la escena.
 */
export function SoundToggle() {
  const audio = useAudio()
  if (!audio.available) return null

  const label = audio.enabled ? audioLabels.disable : audioLabels.enable

  return (
    <motion.button
      type="button"
      className="sound-toggle"
      onClick={audio.toggle}
      aria-label={label}
      aria-pressed={audio.enabled}
      title={label}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.75 }}
      whileHover={{ opacity: 1, scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
    >
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <path
          d="M4 9.5h3.2L12 5.6v12.8L7.2 14.5H4z"
          fill="currentColor"
          opacity="0.9"
        />
        {audio.enabled ? (
          <>
            <path d="M15.4 9.1a4 4 0 0 1 0 5.8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M17.8 6.9a7.2 7.2 0 0 1 0 10.2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </>
        ) : (
          <path d="M15.6 9.6l4.4 4.8M20 9.6l-4.4 4.8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        )}
      </svg>
    </motion.button>
  )
}
