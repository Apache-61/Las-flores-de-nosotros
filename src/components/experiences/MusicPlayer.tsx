import { motion } from 'framer-motion'
import { useState } from 'react'
import type { MusicBlock } from '../../data/types'
import './musicPlayer.css'

/*
 * La canción que acompaña a una sección.
 *
 * El reproductor no se carga hasta que ella toca el control: ningún
 * navegador deja sonar nada sin un gesto previo, y aunque lo dejara, la
 * música no debería empezar sin avisar.
 *
 * Y cuando se carga, se ve. Estuvo escondido en un iframe de 1×1 y fue un
 * error por dos motivos: en el iPhone el sonido sólo arranca si el dedo cae
 * sobre el propio reproductor, así que oculto no habría sonado nunca; y un
 * reproductor invisible no da ninguna pista cuando algo falla. Ahora queda
 * pequeño y recogido bajo el control, pero alcanzable: en el ordenador y en
 * Android empieza solo, y en el iPhone basta un toque encima.
 */
export function MusicPlayer({ block, cid }: { block: MusicBlock; cid?: string }) {
  const [sonando, setSonando] = useState(false)

  if (!block.youtubeId) return null

  /*
   * `origin` le dice a YouTube desde dónde se le llama. Sin esa referencia
   * —y sin cabecera Referer— el reproductor responde con un error 153 y no
   * suena nada, que es justo lo que pasaba.
   */
  const origen = typeof window === 'undefined' ? '' : window.location.origin
  const fuente =
    `https://www.youtube-nocookie.com/embed/${block.youtubeId}` +
    `?autoplay=1&loop=1&playlist=${block.youtubeId}` +
    `&rel=0&modestbranding=1&playsinline=1` +
    (origen ? `&origin=${encodeURIComponent(origen)}` : '')

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

      {sonando && (
        <motion.div
          className="music__reproductor"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <iframe
            className="music__iframe"
            src={fuente}
            title={`${block.title}, de ${block.artist}`}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
          <span className="music__pista">Si no empieza sola, tócala una vez.</span>
        </motion.div>
      )}
    </div>
  )
}
