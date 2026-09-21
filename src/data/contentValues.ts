import { audioCues } from './audio.ts'
import { finalSequence, gardenContent, gardenSettings, seeds } from './garden.ts'
import type { ContentItem } from './contentManifest.ts'

/*
 * Conecta cada identificador del manifiesto con su valor real.
 *
 * Los imports llevan la extensión `.ts` a propósito: así este módulo lo
 * puede cargar tanto Vite como Node directamente, y el generador de la
 * guía lee exactamente los mismos datos que la página.
 */

/** Las raíces que puede recorrer un `path` del manifiesto. */
const roots: Record<string, unknown> = {
  gardenContent,
  finalSequence,
  gardenSettings,
  audio: audioCues,
  seeds,
}

/**
 * Recorre un `path` como `seeds.seed-02.experience.blocks.1.items.0`.
 * Las semillas se buscan por su id, no por su posición, para que
 * reordenarlas no rompa las referencias.
 */
export function resolveContentValue(path: string): unknown {
  const parts = path.split('.')
  let current: unknown = roots[parts[0] as string]
  if (current === undefined) return undefined

  for (let i = 1; i < parts.length; i += 1) {
    if (current === null || current === undefined) return undefined
    const key = parts[i] as string

    if (Array.isArray(current)) {
      // Un array de semillas se indexa por id; el resto, por posición
      const bySeedId = current.find(
        (entry) => typeof entry === 'object' && entry !== null && 'id' in entry && (entry as { id: string }).id === key,
      )
      current = bySeedId ?? current[Number(key)]
      continue
    }

    current = (current as Record<string, unknown>)[key]
  }

  return current
}

export type ContentStatus =
  | 'pendiente'   // falta que escribas o aportes algo
  | 'opcional'    // se puede dejar así; no rompe nada
  | 'por-defecto' // tiene un valor que ya funciona
  | 'listo'       // tiene contenido tuyo

/** Un texto que sigue siendo marcador: `[07 — ESCRIBE ALGO]`. */
const MARKER = /^\[\d{2,3}\s*—/

/** Saca todas las cadenas que haya dentro de un valor, por anidado que esté. */
function collectStrings(value: unknown, found: string[] = []): string[] {
  if (typeof value === 'string') found.push(value)
  else if (Array.isArray(value)) value.forEach((entry) => collectStrings(entry, found))
  else if (value && typeof value === 'object') {
    Object.values(value).forEach((entry) => collectStrings(entry, found))
  }
  return found
}

/** En qué punto está un elemento del manifiesto. */
export function contentStatus(item: ContentItem, value: unknown): ContentStatus {
  if (item.type === 'settings') return 'por-defecto'

  // Archivos y enlaces: mientras sean null, no hay nada puesto
  const needsFile = ['photo', 'video', 'audio', 'playlistUrl', 'url'].includes(item.type)
  if (needsFile) {
    const empty =
      value === null ||
      value === undefined ||
      (typeof value === 'object' && value !== null && 'src' in value && (value as { src: unknown }).src === null)
    if (empty && !(typeof value === 'object' && value !== null && collectStrings(value).some((s) => !MARKER.test(s) && s.length > 0))) {
      return item.required ? 'pendiente' : 'opcional'
    }
  }

  const strings = collectStrings(value)
  if (strings.some((text) => MARKER.test(text))) {
    return item.required ? 'pendiente' : 'opcional'
  }

  if (item.defaultValue !== undefined && value === item.defaultValue) return 'por-defecto'
  if (strings.length === 0 && (value === null || value === undefined)) {
    return item.required ? 'pendiente' : 'opcional'
  }

  return 'listo'
}

/** El valor de un elemento, en texto legible para la guía y el panel. */
export function formatContentValue(value: unknown): string {
  if (value === null) return 'null'
  if (value === undefined) return '—'
  if (typeof value === 'string') return value
  if (Array.isArray(value)) return value.map((entry) => formatContentValue(entry)).join(' · ')
  if (typeof value === 'object') {
    return Object.entries(value)
      .map(([key, entry]) => `${key}: ${formatContentValue(entry)}`)
      .join(' · ')
  }
  return String(value)
}
