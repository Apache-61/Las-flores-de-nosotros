import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { gardenSettings, seeds } from '../data/garden'
import type { SeedId, SeedStatus } from '../data/types'

/*
 * La versión va en la clave a propósito.
 *
 * Hasta la v1 las cinco semillas se abrían en cualquier orden, así que lo
 * guardado entonces significa otra cosa que ahora: un jardín con las cinco
 * marcadas y el final visto deja el orden sin sentido y la última semilla
 * sin nada que abrir. Al cambiar de número, lo viejo se ignora y quien ya
 * había entrado empieza de nuevo, que es justo lo que queremos.
 */
const STORAGE_KEY = 'jardin-de-nuestra-distancia:v2'

const experienceSeedIds = seeds
  .filter((seed) => seed.kind === 'experience')
  .map((seed) => seed.id)

const finalSeed = seeds.find((seed) => seed.kind === 'final')

interface StoredProgress {
  discovered: SeedId[]
  lastDiscovered: SeedId | null
  finalSeen: boolean
}

function readStored(): StoredProgress | null {
  if (!gardenSettings.persistProgress || typeof window === 'undefined') return null
  if (window.location.hash === gardenSettings.resetHash) {
    window.localStorage.removeItem(STORAGE_KEY)
    return null
  }
  // Lo guardado por versiones anteriores ya no significa lo mismo: se tira.
  try {
    window.localStorage.removeItem('jardin-de-nuestra-distancia:v1')
  } catch {
    /* sin almacenamiento no hay nada que barrer */
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as StoredProgress
    if (!Array.isArray(parsed.discovered)) return null
    // Descarta ids que ya no existan en los datos
    const valid = parsed.discovered.filter((id) =>
      seeds.some((seed) => seed.id === id),
    )
    return { ...parsed, discovered: valid }
  } catch {
    return null
  }
}

/**
 * El estado del jardín.
 *
 * Sabe en todo momento:
 *   - qué semillas fueron descubiertas y cuántas;
 *   - cuál fue la última;
 *   - cuál está vibrando (activa);
 *   - si el final ya está listo.
 *
 * Las semillas se abren en orden: sólo responde la que toca.
 */
export function useGardenProgress() {
  // Se lee una sola vez; el envoltorio evita releer cuando no hay nada guardado
  const stored = useRef<{ value: StoredProgress | null } | null>(null)
  if (stored.current === null) stored.current = { value: readStored() }

  const [discovered, setDiscovered] = useState<SeedId[]>(
    () => stored.current?.value?.discovered ?? [],
  )
  const [lastDiscovered, setLastDiscovered] = useState<SeedId | null>(
    () => stored.current?.value?.lastDiscovered ?? null,
  )
  const [finalSeen, setFinalSeen] = useState<boolean>(
    () => stored.current?.value?.finalSeen ?? false,
  )
  const [openingSeedId, setOpeningSeedId] = useState<SeedId | null>(null)

  useEffect(() => {
    if (!gardenSettings.persistProgress) return
    try {
      const payload: StoredProgress = { discovered, lastDiscovered, finalSeen }
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
    } catch {
      /* almacenamiento no disponible — el jardín sigue funcionando igual */
    }
  }, [discovered, lastDiscovered, finalSeen])

  const pending = useMemo(
    () => experienceSeedIds.filter((id) => !discovered.includes(id)),
    [discovered],
  )

  const allExperiencesDiscovered = pending.length === 0

  /**
   * La semilla que toca abrir.
   *
   * El jardín se recorre en orden: siempre es la primera sin descubrir,
   * y cuando ya no queda ninguna, la última. Así la historia se lee
   * como está escrita y no a saltos.
   */
  const activeSeedId: SeedId | null = useMemo(() => {
    if (allExperiencesDiscovered) {
      return finalSeen ? null : (finalSeed?.id ?? null)
    }
    return pending[0] ?? null
  }, [allExperiencesDiscovered, finalSeen, pending])

  const statusOf = useCallback(
    (id: SeedId): SeedStatus => {
      if (openingSeedId === id) return 'opening'
      if (id === finalSeed?.id && finalSeen) return 'final'
      if (discovered.includes(id)) return 'discovered'
      if (id === activeSeedId) return 'active'
      return 'waiting'
    },
    [activeSeedId, discovered, finalSeen, openingSeedId],
  )

  /** Sólo se puede abrir la semilla a la que le toca. */
  const canOpen = useCallback(
    (id: SeedId) => id === activeSeedId || discovered.includes(id),
    [activeSeedId, discovered],
  )

  const markOpening = useCallback((id: SeedId | null) => setOpeningSeedId(id), [])

  const markDiscovered = useCallback((id: SeedId) => {
    setDiscovered((current) => (current.includes(id) ? current : [...current, id]))
    setLastDiscovered(id)
  }, [])

  const markFinalSeen = useCallback(() => setFinalSeen(true), [])

  const reset = useCallback(() => {
    setDiscovered([])
    setLastDiscovered(null)
    setFinalSeen(false)
    setOpeningSeedId(null)
  }, [])

  return {
    discovered,
    discoveredCount: discovered.length,
    totalSeeds: seeds.length,
    experienceCount: experienceSeedIds.length,
    lastDiscovered,
    activeSeedId,
    openingSeedId,
    finalSeen,
    /** El final está listo cuando ya descubrió las cinco primeras. */
    isFinalReady: allExperiencesDiscovered,
    /** 0 → jardín recién nacido, 1 → jardín lleno de vida. */
    growth: discovered.length / experienceSeedIds.length,
    statusOf,
    canOpen,
    markOpening,
    markDiscovered,
    markFinalSeen,
    reset,
  }
}

export type GardenProgress = ReturnType<typeof useGardenProgress>
