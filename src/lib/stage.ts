/**
 * Conversión de "profundidad" a apariencia.
 * Una semilla al fondo del jardín (depth 0) se ve más pequeña, más
 * tenue y se mueve menos que una en primer plano (depth 1).
 */

export function depthToScale(depth: number, boost = 1): number {
  return (0.74 + depth * 0.46) * boost
}

export function depthToOpacity(depth: number): number {
  return 0.76 + depth * 0.24
}

/** Cuánto se desplaza un elemento con el paralaje del cursor. */
export function depthToParallax(depth: number): number {
  return 2 + depth * 10
}

/** Limita un número a un rango. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}
