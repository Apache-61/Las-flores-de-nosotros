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

/*
 * Los cuatro sonidos están sintetizados a propósito para este jardín:
 * notas limpias de una misma escala, para que suenen como piezas de lo
 * mismo y nunca se interpongan. Si prefieres otros, sustituye el archivo
 * en public/audio/ y deja la ruta como está.
 *
 * `ambient` sigue en null: una música de fondo constante competiría con
 * la canción del poema, y es mejor que sólo suene la que importa.
 */
export const audioCues: Record<AudioCueId, AudioCue> = {
  ambient: { src: null, volume: 0.3, loop: true, ambient: true },
  germination: { src: 'audio/germinacion.mp3', volume: 0.55 },
  seedTap: { src: 'audio/toque.mp3', volume: 0.4 },
  bloom: { src: 'audio/brote.mp3', volume: 0.45 },
  finale: { src: 'audio/final.mp3', volume: 0.6 },
}

/** Etiquetas del interruptor de sonido (sólo aparece si hay alguna pista). */
export const audioLabels = {
  enable: 'Activar sonido',
  disable: 'Silenciar',
} as const
