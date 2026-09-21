/**
 * SONIDO — arquitectura lista, sin sonido todavía.
 *
 * Nada suena mientras todas las pistas estén en `null`: no se descarga
 * ni un byte y no aparece ningún control. En cuanto pongas una ruta,
 * el jardín muestra un interruptor discreto para silenciar/activar.
 *
 * Para añadir sonido:
 *   1. Copia el archivo en  public/audio/
 *   2. Escribe la ruta aquí, por ejemplo:  src: 'audio/ambiente.mp3'
 *
 * El navegador no permite reproducir nada antes de que la persona
 * interactúe, así que la música ambiental arranca en el primer toque
 * (el botón de la pantalla inicial), nunca antes.
 */

export type AudioCueId =
  | 'ambient'      // música de fondo del jardín
  | 'germination'  // la semilla inicial germina
  | 'seedTap'      // toque sobre una semilla
  | 'bloom'        // una semilla se convierte en flor
  | 'finale'       // la gran animación final

export interface AudioCue {
  /** Ruta del archivo, o `null` para dejarlo sin sonido. */
  src: string | null
  volume: number
  loop?: boolean
  /** Sólo para `ambient`: empieza tras la primera interacción. */
  ambient?: boolean
}

export const audioCues: Record<AudioCueId, AudioCue> = {
  ambient: { src: null, volume: 0.35, loop: true, ambient: true },
  germination: { src: null, volume: 0.5 },
  seedTap: { src: null, volume: 0.35 },
  bloom: { src: null, volume: 0.4 },
  finale: { src: null, volume: 0.55 },
}

/** Etiquetas del interruptor de sonido (sólo aparece si hay alguna pista). */
export const audioLabels = {
  enable: 'Activar sonido',
  disable: 'Silenciar',
} as const
