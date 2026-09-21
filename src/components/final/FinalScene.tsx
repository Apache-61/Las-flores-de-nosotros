import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useRef } from 'react'
import { useAudio } from '../../audio/AudioProvider'
import { finalSequence, withName } from '../../data/garden'
import { useElementSize } from '../../hooks/useElementSize'
import { useStageLayout } from '../../hooks/useStageLayout'
import { useTimedSequence } from '../../hooks/useTimedSequence'
import { BOUQUET_BASE, buildFinalFlowers, type FinalFlower } from '../../lib/bouquet'
import { between, createRandom } from '../../lib/random'
import { easeRise, easeSoft } from '../shared/motion'
import { FlowerHead } from '../flowers/FlowerHead'
import './FinalScene.css'

type Phase = 'react' | 'expand' | 'storm' | 'pullback' | 'settle' | 'phrase'

interface FinalSceneProps {
  accent: string
  /** Punto exacto de la semilla que se tocó: de ahí nace toda la escena. */
  origin: { x: number; y: number } | null
  onSeen: () => void
  onReturn: () => void
}

/**
 * EL FUTURO DE NOSOTROS — la gran animación final.
 *
 *   react    la semilla reacciona y la luz se concentra
 *   expand   las flores empiezan a brotar desde el suelo y los bordes
 *   storm    la pantalla entera es un campo de flores amarillas
 *   pullback la cámara se aleja y las flores se reorganizan
 *   settle   se revela que todas juntas forman un ramo
 *   phrase   la frase aparece arriba y la escena se queda quieta
 *
 * Los tiempos, la cantidad de flores y la frase se configuran en
 * src/data/garden.ts → finalSequence.
 */
export function FinalScene({ accent, origin, onSeen, onReturn }: FinalSceneProps) {
  const reduced = useReducedMotion()
  const layout = useStageLayout()
  const audio = useAudio()
  const { ref: fieldRef, size: field } = useElementSize<HTMLDivElement>()

  const flowers = useMemo(
    () =>
      buildFinalFlowers(
        layout.isCompact
          ? finalSequence.flowerCount.mobile
          : finalSequence.flowerCount.desktop,
        layout.isPortrait,
      ),
    [layout.isCompact, layout.isPortrait],
  )

  const pollen = useMemo(() => {
    const random = createRandom(9042)
    return Array.from({ length: layout.isCompact ? 10 : 16 }, (_, id) => ({
      id,
      x: between(random, 8, 92),
      y: between(random, 42, 92),
      size: between(random, 3, 6.5),
      rise: between(random, 90, 220),
      drift: between(random, -30, 30),
      opacity: between(random, 0.3, 0.7),
      duration: between(random, 9, 17),
      delay: between(random, 0, 7),
    }))
  }, [layout.isCompact])

  const steps = useMemo(() => {
    const t = finalSequence.timings
    // Sin movimiento: se va directamente al ramo ya formado.
    if (reduced) {
      return [
        { phase: 'react' as Phase, duration: 200 },
        { phase: 'settle' as Phase, duration: 700 },
        { phase: 'phrase' as Phase, duration: 0 },
      ]
    }
    return [
      { phase: 'react' as Phase, duration: t.react },
      { phase: 'expand' as Phase, duration: t.expand },
      { phase: 'storm' as Phase, duration: t.storm },
      { phase: 'pullback' as Phase, duration: t.pullback },
      { phase: 'settle' as Phase, duration: t.settle + t.phraseDelay },
      { phase: 'phrase' as Phase, duration: 0 },
    ]
  }, [reduced])

  const sequence = useTimedSequence<Phase>(steps)
  const { phase } = sequence

  useEffect(() => {
    audio.play('finale')
    // Sólo al montar: la escena final ocurre una vez.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /*
   * El jardín sigue vivo debajo durante la reacción de la semilla, así que
   * no se da por vista hasta que las flores ya lo taparon del todo. Si se
   * marcara antes, la semilla se convertiría en flor a la vista de todos.
   */
  const seen = useRef(false)
  useEffect(() => {
    if (seen.current) return
    if (phase === 'storm' || phase === 'pullback' || phase === 'settle' || phase === 'phrase') {
      seen.current = true
      onSeen()
    }
  }, [onSeen, phase])

  const bouquetFormed = phase === 'settle' || phase === 'phrase'
  const gathering = bouquetFormed || phase === 'pullback'
  const showPhrase = phase === 'phrase'

  /** La cámara: se acerca durante la tormenta y se aleja al final. */
  const camera = {
    react: { scale: reduced ? 1 : 1.8, y: '4%' },
    expand: { scale: 1.66, y: '2%' },
    storm: { scale: 1.52, y: '0%' },
    pullback: { scale: 1.02, y: '0%' },
    settle: { scale: 0.98, y: '0%' },
    phrase: { scale: 0.98, y: '0%' },
  }[phase]

  return (
    <motion.section
      className="final"
      aria-label="El futuro de nosotros"
      style={{ ['--final-accent' as string]: accent }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1, ease: easeSoft } }}
      transition={{ duration: 0.9, ease: easeSoft }}
    >
      {/*
        La escena empieza siendo transparente: debajo sigue el jardín, con
        la semilla creciendo. El cielo del final sólo se cierra cuando las
        flores ya están tapando el mundo anterior.
      */}
      <motion.div
        className="final__sky"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === 'react' ? 0 : 1 }}
        transition={{ duration: 2.2, ease: easeSoft }}
      />

      {/* El destello inicial: la semilla reaccionando */}
      <motion.div
        className="final__burst-light"
        aria-hidden="true"
        style={
          origin
            ? { left: origin.x, top: origin.y }
            : { left: '50%', top: '50%' }
        }
        initial={{ scale: 0.06, opacity: 0 }}
        animate={{
          scale: phase === 'react' ? 0.5 : 3.6,
          // Durante la reacción la luz la pone la propia semilla, en el jardín
          opacity: phase === 'react' ? 0 : bouquetFormed ? 0.1 : 0.42,
        }}
        transition={{
          duration: phase === 'react' ? finalSequence.timings.react / 1000 : 2.4,
          ease: easeRise,
        }}
      />

      <motion.div
        ref={fieldRef}
        className="final__field"
        aria-hidden="true"
        animate={camera}
        transition={{
          duration: phase === 'pullback' ? finalSequence.timings.pullback / 1000 : 1.6,
          ease: easeRise,
        }}
      >
        {/* Los tallos sólo existen cuando las flores ya se están juntando */}
        {gathering && (
          <svg className="final__stems" viewBox="0 0 100 100" preserveAspectRatio="none">
            {flowers.map((flower) => (
              <motion.path
                key={flower.id}
                d={flower.stem}
                fill="none"
                stroke="var(--c-leaf-deep)"
                opacity={0.85}
                strokeWidth={1.5}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.6 + flower.depth * 0.3 }}
                transition={{
                  duration: 1.6,
                  ease: easeRise,
                  delay: 1.1 + flower.delay * 0.9,
                }}
              />
            ))}
          </svg>
        )}

        {/* El papel que envuelve el ramo. Tiene lienzo propio: dentro del
            campo (que se estira con la pantalla) se deformaría. */}
        <motion.div
          className="final__wrap"
          style={{ left: `${BOUQUET_BASE.x}%`, top: `${BOUQUET_BASE.y}%` }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: bouquetFormed ? 1 : 0, scale: bouquetFormed ? 1 : 0.9 }}
          transition={{ duration: 1.4, ease: easeSoft, delay: bouquetFormed ? 0.3 : 0 }}
        >
          <svg viewBox="0 0 120 108" aria-hidden="true">
            <path
              d="M12 6 C 34 22, 86 22, 108 6 C 104 46, 78 86, 60 104 C 42 86, 16 46, 12 6 Z"
              fill="var(--c-cream-warm)"
              opacity="0.9"
            />
            <path
              d="M12 6 C 34 22, 86 22, 108 6 C 96 34, 78 52, 60 60 C 42 52, 24 34, 12 6 Z"
              fill="var(--c-sand)"
              opacity="0.55"
            />
            <path
              d="M26 58 C 42 70, 78 70, 94 58"
              fill="none"
              stroke="var(--c-rose)"
              strokeWidth="3.4"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>

        {flowers.map((flower) => (
          <FinalFlowerNode
            key={flower.id}
            flower={flower}
            phase={phase}
            reduced={Boolean(reduced)}
            compact={layout.isCompact}
            field={field}
          />
        ))}
      </motion.div>

      {/* Polen flotando: sin esto el ramo se queda quieto como una foto */}
      {bouquetFormed && !reduced && (
        <div className="final__pollen" aria-hidden="true">
          {pollen.map((mote) => (
            <motion.span
              key={mote.id}
              className="final__mote"
              style={{ left: `${mote.x}%`, top: `${mote.y}%`, width: mote.size, height: mote.size }}
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: [0, mote.opacity, 0], y: -mote.rise, x: mote.drift }}
              transition={{
                duration: mote.duration,
                delay: mote.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      )}

      {/* ── La frase final ───────────────────────────────────────────── */}
      <AnimatePresence>
        {showPhrase && (
          <motion.div
            key="final-phrase"
            className="final__phrase"
            style={{
              top: finalSequence.phrase.top,
              maxWidth: finalSequence.phrase.maxWidth,
              fontSize: finalSequence.phrase.size,
            }}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2.2, ease: easeRise }}
          >
            {finalSequence.eyebrow && (
              <motion.p
                className="final__eyebrow u-eyebrow"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ duration: 1.6, delay: 0.5 }}
              >
                {withName(finalSequence.eyebrow)}
              </motion.p>
            )}
            <p
              className={
                finalSequence.phrase.font === 'serif'
                  ? 'final__message u-serif'
                  : 'final__message'
              }
            >
              {withName(finalSequence.message)}
            </p>
            {finalSequence.signature && (
              <motion.p
                className="final__signature"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.75 }}
                transition={{ duration: 1.6, delay: 1.4 }}
              >
                {withName(finalSequence.signature)}
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Salida discreta, sólo cuando la escena ya respiró */}
      <AnimatePresence>
        {showPhrase && finalSequence.allowReturnToGarden && (
          <motion.button
            key="final-return"
            type="button"
            className="final__return"
            onClick={onReturn}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            whileHover={{ opacity: 1 }}
            whileFocus={{ opacity: 1 }}
            transition={{ duration: 1.8, delay: 3.4 }}
          >
            {finalSequence.returnLabel}
          </motion.button>
        )}
      </AnimatePresence>
    </motion.section>
  )
}

/**
 * Una flor de la escena final.
 * Va de la entrada a la tormenta y de la tormenta al ramo; todo el
 * movimiento está en transform, así que aun con decenas de flores
 * la animación no castiga al teléfono.
 */
function FinalFlowerNode({
  flower,
  phase,
  reduced,
  compact,
  field,
}: {
  flower: FinalFlower
  phase: Phase
  reduced: boolean
  compact: boolean
  field: { width: number; height: number }
}) {
  const { timings } = finalSequence
  const inBouquet = phase === 'pullback' || phase === 'settle' || phase === 'phrase'
  const target = inBouquet ? flower.bouquet : flower.burst

  // Los porcentajes del ramo se traducen a píxeles: así todo el
  // movimiento es `transform` y el navegador no rehace la maquetación.
  const toPx = (point: { x: number; y: number }) => ({
    x: (point.x / 100) * field.width,
    y: (point.y / 100) * field.height,
  })

  const entry = toPx(flower.entry)
  const place = phase === 'react' ? entry : toPx(target)

  const duration =
    phase === 'expand'
      ? (timings.expand / 1000) * 0.9
      : phase === 'pullback'
        ? (timings.pullback / 1000) * 0.75
        : phase === 'storm'
          ? timings.storm / 1000
          : 1.2

  const delay =
    phase === 'expand'
      ? flower.delay * (timings.expand / 1000) * 0.75
      : phase === 'pullback'
        ? flower.delay * (timings.pullback / 1000) * 0.3
        : 0

  return (
    <motion.div
      className="final__flower"
      style={{ zIndex: 10 + Math.round(flower.depth * 30) }}
      initial={{ x: entry.x, y: entry.y, scale: 0.2, opacity: 0 }}
      animate={{
        x: place.x,
        y: place.y,
        scale: phase === 'react' ? 0.2 : target.scale,
        rotate: phase === 'react' ? 0 : target.rotate,
        opacity: phase === 'react' ? 0 : 1,
      }}
      transition={{
        duration: reduced ? 0.6 : duration,
        delay: reduced ? 0 : delay,
        ease: easeRise,
      }}
    >
      <div className="final__flower-art">
        <FlowerHead
          accent={flower.accent}
          petals={flower.petals}
          variant={flower.variant}
          size={compact ? 84 : 104}
        />
      </div>
    </motion.div>
  )
}
