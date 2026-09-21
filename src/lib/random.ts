/**
 * Aleatoriedad reproducible.
 *
 * El jardín se dibuja con posiciones "al azar", pero deben ser siempre
 * las mismas: si cambiaran en cada render, la vegetación bailaría sola.
 * Este generador da números pseudoaleatorios a partir de una semilla fija.
 */

export function createRandom(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Número aleatorio entre `min` y `max`. */
export function between(random: () => number, min: number, max: number): number {
  return min + random() * (max - min)
}

/** Elige un elemento de la lista. */
export function pick<T>(random: () => number, items: readonly T[]): T {
  return items[Math.floor(random() * items.length)] as T
}
