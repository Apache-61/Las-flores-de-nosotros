import { motion } from 'framer-motion'
import type {
  ExperienceBlock,
  FactsBlock,
  GalleryBlock,
  MapBlock,
  PlaylistBlock,
  QuoteBlock,
  TextBlock,
  VideoBlock,
} from '../../data/types'
import { withName } from '../../data/garden'
import { riseIn } from '../shared/motion'
import { PlaceholderFrame } from './PlaceholderFrame'
import './ExperienceBlocks.css'

/**
 * Cada tipo de bloque sabe dibujarse solo.
 * Añadir un bloque nuevo a una experiencia es escribirlo en
 * src/data/garden.ts — aquí no hay que tocar nada.
 */
export function BlockRenderer({
  block,
  seedId,
}: {
  block: ExperienceBlock
  seedId: string
}) {
  return (
    <motion.section className="block" variants={riseIn}>
      {renderBlock(block, seedId)}
    </motion.section>
  )
}

function renderBlock(block: ExperienceBlock, seedId: string) {
  switch (block.kind) {
    case 'text':
      return <TextContent block={block} />
    case 'quote':
      return <QuoteContent block={block} />
    case 'gallery':
      return <GalleryContent block={block} seedId={seedId} />
    case 'video':
      return <VideoContent block={block} seedId={seedId} />
    case 'playlist':
      return <PlaylistContent block={block} seedId={seedId} />
    case 'map':
      return <MapContent block={block} />
    case 'facts':
      return <FactsContent block={block} />
  }
}

function Heading({ text }: { text?: string }) {
  if (!text) return null
  return <h2 className="block__heading u-serif">{withName(text)}</h2>
}

/* ── Texto ─────────────────────────────────────────────────────────── */

function TextContent({ block }: { block: TextBlock }) {
  return (
    <>
      <Heading text={block.heading} />
      <div className="block__prose">
        {block.paragraphs.map((paragraph, index) => (
          <p key={index}>{withName(paragraph)}</p>
        ))}
      </div>
    </>
  )
}

/* ── Frase suelta ──────────────────────────────────────────────────── */

function QuoteContent({ block }: { block: QuoteBlock }) {
  return (
    <figure className="block__quote">
      <blockquote className="u-serif">{withName(block.text)}</blockquote>
      {block.attribution && (
        <figcaption>{withName(block.attribution)}</figcaption>
      )}
    </figure>
  )
}

/* ── Fotografías ───────────────────────────────────────────────────── */

function GalleryContent({ block, seedId }: { block: GalleryBlock; seedId: string }) {
  return (
    <>
      <Heading text={block.heading} />
      <div className="block__gallery">
        {block.items.map((item, index) => (
          <figure key={index} className="block__photo">
            {item.src ? (
              <img src={item.src} alt={item.alt} loading="lazy" decoding="async" />
            ) : (
              <PlaceholderFrame
                token="[AGREGA FOTO]"
                hint={`src/data/garden.ts → ${seedId} → gallery → items[${index}].src (imágenes en public/media/)`}
              />
            )}
            <figcaption>{withName(item.caption)}</figcaption>
          </figure>
        ))}
      </div>
    </>
  )
}

/* ── Video ─────────────────────────────────────────────────────────── */

function VideoContent({ block, seedId }: { block: VideoBlock; seedId: string }) {
  return (
    <>
      <Heading text={block.heading} />
      <div className="block__video">
        {block.src === null && (
          <PlaceholderFrame
            token="[VIDEO_URL]"
            ratio="16 / 9"
            hint={`src/data/garden.ts → ${seedId} → video → src (archivo en public/media/ o URL de /embed/)`}
          />
        )}
        {block.src !== null && block.mode === 'file' && (
          <video
            src={block.src}
            poster={block.poster ?? undefined}
            controls
            playsInline
            preload="none"
          />
        )}
        {block.src !== null && block.mode === 'embed' && (
          <div className="block__embed block__embed--video">
            <iframe
              src={block.src}
              title={withName(block.caption)}
              loading="lazy"
              allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
      </div>
      <p className="block__caption">{withName(block.caption)}</p>
    </>
  )
}

/* ── Playlist ──────────────────────────────────────────────────────── */

function PlaylistContent({ block, seedId }: { block: PlaylistBlock; seedId: string }) {
  return (
    <>
      <Heading text={block.heading} />
      {block.embedUrl ? (
        <div className="block__embed block__embed--playlist">
          <iframe
            src={block.embedUrl}
            title="Playlist"
            loading="lazy"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          />
        </div>
      ) : (
        <PlaceholderFrame
          token="[PLAYLIST_URL]"
          ratio="3 / 2"
          hint={`src/data/garden.ts → ${seedId} → playlist → embedUrl (URL de "Insertar" de Spotify, Apple Music o YouTube)`}
        />
      )}
      <ol className="block__tracks">
        {block.tracks.map((track, index) => (
          <li key={index}>
            <span className="block__track-index">{String(index + 1).padStart(2, '0')}</span>
            <span className="block__track-body">
              <span className="block__track-title">{withName(track.title)}</span>
              <span className="block__track-artist">{withName(track.artist)}</span>
              {track.note && <span className="block__track-note">{withName(track.note)}</span>}
            </span>
          </li>
        ))}
      </ol>
    </>
  )
}

/* ── Mapa ──────────────────────────────────────────────────────────── */

function MapContent({ block }: { block: MapBlock }) {
  return (
    <>
      <Heading text={block.heading} />
      {block.embedUrl ? (
        <div className="block__embed block__embed--map">
          <iframe src={block.embedUrl} title="Mapa" loading="lazy" />
        </div>
      ) : (
        <DrawnMap block={block} />
      )}
      {block.note && <p className="block__caption">{withName(block.note)}</p>}
    </>
  )
}

/** Mapa ilustrado: dos puntos y la distancia entre ellos. Sin librerías. */
function DrawnMap({ block }: { block: MapBlock }) {
  return (
    <div className="drawn-map">
      <svg viewBox="0 0 400 200" className="drawn-map__canvas" role="img"
        aria-label={`${withName(block.from.label)} y ${withName(block.to.label)}`}>
        <defs>
          <radialGradient id="map-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--c-flower)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--c-flower)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* paralelos y meridianos apenas insinuados */}
        <g stroke="rgba(107, 79, 58, 0.18)" strokeWidth="1">
          {[40, 80, 120, 160].map((y) => (
            <line key={y} x1="10" y1={y} x2="390" y2={y} />
          ))}
          {[80, 160, 240, 320].map((x) => (
            <line key={x} x1={x} y1="16" x2={x} y2="184" />
          ))}
        </g>

        {/* la línea que une los dos lugares */}
        <motion.path
          d="M78 138 C 150 58, 250 58, 322 122"
          fill="none"
          stroke="var(--c-flower-deep)"
          strokeWidth="2"
          strokeDasharray="6 7"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: [0.16, 0.84, 0.34, 1] }}
        />

        <circle cx="78" cy="138" r="26" fill="url(#map-glow)" />
        <circle cx="322" cy="122" r="26" fill="url(#map-glow)" />
        <circle cx="78" cy="138" r="6.5" fill="var(--c-earth)" />
        <circle cx="322" cy="122" r="6.5" fill="var(--c-earth)" />
      </svg>

      <div className="drawn-map__legend">
        <span className="drawn-map__place">
          <strong>{withName(block.from.label)}</strong>
          <em>{withName(block.from.detail)}</em>
        </span>
        <span className="drawn-map__distance">{withName(block.distanceLabel)}</span>
        <span className="drawn-map__place drawn-map__place--end">
          <strong>{withName(block.to.label)}</strong>
          <em>{withName(block.to.detail)}</em>
        </span>
      </div>
    </div>
  )
}

/* ── Datos ─────────────────────────────────────────────────────────── */

function FactsContent({ block }: { block: FactsBlock }) {
  return (
    <>
      <Heading text={block.heading} />
      <dl className="block__facts">
        {block.items.map((item, index) => (
          <div key={index} className="block__fact">
            <dt>{withName(item.label)}</dt>
            <dd className="u-serif">{withName(item.value)}</dd>
          </div>
        ))}
      </dl>
    </>
  )
}
