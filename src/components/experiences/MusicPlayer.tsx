import { motion } from 'framer-motion'
import { useState } from 'react'
import type { MusicBlock } from '../../data/types'
import './musicPlayer.css'

/*
 * La canción que acompaña a una sección.
 *
 * El reproductor de YouTube se carga oculto y sólo después de que ella
 * toque el control: ningún navegador deja sonar nada sin un gesto
 * previo, y aunque lo dejara, la música no debería empezar sin avisar.
 * Lo que se ve es un control pequeño, del mismo material que el resto
 * del jardín, no la interfaz de YouTube.
 */
export function MusicPlayer({ block, cid }: { block: MusicBlock; cid?: string }) {
  const [sonando, setSonando] = useState(false)

  if (!block.youtubeId) return null

  const fuente =
    `https://www.youtube-nocookie.com/embed/${block.youtubeId}` +
    `?autoplay=1&loop=1&playlist=${block.youtubeId}&rel=0&modestbranding=1`

  return (
    <div className="music" data-cid={cid}>
      <motion.button
        type="button"
        className={`music__control ${sonando ? 'music__control--sonando' : ''}`}
        onClick={() => setSonando((valor) => !valor)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        aria-pressed={sonando}
      >
        <span className="music__icono" aria-hidden="true">
          {sonando ? (
            <svg viewBox="0 0 24 24" width="18" height="18">
              <rect x="7" y="6" width="3.6" height="12" rx="1.2" fill="currentColor" />
              <rect x="13.4" y="6" width="3.6" height="12" rx="1.2" fill="currentColor" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path d="M9 6.2 L18 12 L9 17.8 Z" fill="currentColor" />
            </svg>
          )}
        </span>
        <span className="music__texto">
          <span className="music__etiqueta">
            {sonando ? 'Sonando' : block.label}
          </span>
          <span className="music__cancion">
            {block.title} · {block.artist}
          </span>
        </span>
        {sonando && (
          <span className="music__ondas" aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={{ scaleY: [0.4, 1, 0.4] }}
                transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.18 }}
              />
            ))}
          </span>
        )}
      </motion.button>

      {/* El reproductor, sin ocupar sitio: sólo nos interesa el sonido */}
      {sonando && (
        <iframe
          className="music__iframe"
          src={fuente}
          title={`${block.title}, de ${block.artist}`}
          allow="autoplay; encrypted-media"
          tabIndex={-1}
          aria-hidden="true"
        />
      )}
    </div>
  )
}
