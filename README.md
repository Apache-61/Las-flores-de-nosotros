# El Jardín de Nuestra Distancia

Un jardín digital que crece a medida que se descubre.

> Esta es la **primera versión funcional**: la experiencia visual, la navegación,
> las animaciones y el sistema de componentes están terminados. El contenido
> —los mensajes, las fotos, la música, el video, el mapa y la frase final— está
> en blanco, marcado con placeholders `[ASÍ]` para que lo escribas tú.

---

## Cómo ejecutarlo

```bash
npm install     # sólo la primera vez
npm run dev     # abre http://localhost:5173
```

Para generar la versión estática (la que se publica):

```bash
npm run build     # deja el resultado en dist/
npm run preview   # para verla antes de publicarla
```

Comprobar que no hay errores de TypeScript:

```bash
npm run typecheck
```

---

## Dónde se escribe cada cosa

**Casi todo está en un solo archivo: `src/data/garden.ts`.**
No hace falta saber React: se cambia el texto entre comillas y listo.

| Qué quieres poner | Dónde |
|---|---|
| Su nombre | `gardenContent.recipientName` — y puedes usar `{nombre}` dentro de cualquier texto |
| La frase de la pantalla inicial | `gardenContent.intro.message` |
| El texto del botón de entrada | `gardenContent.intro.action` |
| La bienvenida del jardín | `gardenContent.garden.welcome` |
| Los títulos de las seis semillas | `seeds[].label` y `seeds[].subtitle` |
| **Tus mensajes / cartas** | bloque `text` de cada semilla → `paragraphs` |
| **Las fotografías** | archivos en `public/media/` → bloque `gallery` → `items[].src` |
| **El video** | archivo en `public/media/` (o URL de `/embed/`) → bloque `video` → `src` |
| **La playlist** | bloque `playlist` → `embedUrl` (URL de "Insertar" de Spotify) y `tracks` |
| **El mapa** | bloque `map` → `from`, `to`, `distanceLabel`; `embedUrl` si quieres un mapa real |
| **La frase final** | `finalSequence.message` |
| La música y los sonidos | `src/data/audio.ts` (archivos en `public/audio/`) |
| Colores y tipografías | `src/styles/tokens.css` |
| Ritmo de la animación final | `finalSequence.timings` |

> Las rutas de archivos se escriben **sin barra al principio**
> (`media/foto.jpg`, no `/media/foto.jpg`) para que funcionen también
> al publicar en GitHub Pages dentro de un subdirectorio.

### Los bloques de contenido

Cada una de las cinco experiencias es una **lista de bloques**. Puedes mezclarlos,
repetirlos, borrarlos o cambiarlos de semilla libremente: la pantalla se construye
sola a partir de esa lista.

`text` (párrafos) · `quote` (una frase) · `gallery` (fotos) · `video` · `playlist`
· `map` (los dos lugares y la distancia) · `facts` (datos con etiqueta)

Ahora mismo cada semilla trae un tipo distinto **sólo para que veas cómo se ve
cada uno**. El orden y el tema de las cinco están sin decidir a propósito.

---

## Qué hay construido

- **Pantalla inicial** con una semilla plantada en la tierra, de la que nace la
  luz. Al tocarla —la semilla misma o el botón— germina: brota el tallo, se
  abren las hojas, nace la primera flor y la luz se lleva la pantalla al jardín.
- **El jardín**: cielo, sol, cuatro planos de campo, vegetación que crece,
  polen flotando y una mariposa que lo cruza de vez en cuando.
- **Seis semillas** plantadas en el terreno (no en una cuadrícula), que respiran,
  reaccionan al cursor y se pueden abrir en cualquier orden.
- **Semilla activa**: en todo momento hay una que respira más fuerte, se rodea de
  luz y suelta motas de polen invitando a ser descubierta, sin bloquear a las
  demás. Va cambiando sola.
- **Ninguna semilla es igual a otra**: cambian de forma, tamaño e inclinación.
  La última lleva siempre un capullo dorado asomando: se nota que guarda algo.
- **Transición de luz**: al tocar una semilla, la luz nace en ese punto exacto,
  llena la pantalla y desde ella aparece la experiencia. Al volver, se recoge.
- **Cinco experiencias** con placeholders de todos los tipos de contenido.
- **El jardín recuerda**: cada semilla descubierta vuelve convertida en flor y el
  jardín entero se llena de vida (más hojas, más flores, más luz).
- **La sexta semilla — el final**: no hay corte ni pantalla nueva. La semilla
  crece y tiembla *dentro del jardín* hasta desbordarse de luz; entonces la
  pantalla se llena de flores amarillas, la cámara se aleja, las flores se
  reorganizan y se revela que forman un ramo. Entonces, y sólo entonces,
  aparece la frase final arriba.

---

## Estructura

```
src/
  data/
    garden.ts        ← TODO EL CONTENIDO (es el archivo que vas a editar)
    audio.ts         ← música y sonidos
    types.ts         ← tipos; no hace falta tocarlo
  components/
    intro/           pantalla inicial y germinación
    garden/          fondo, vegetación, atmósfera, escena del jardín
    seeds/           la semilla interactiva y su dibujo
    flowers/         la flor (se reutiliza en el jardín y en el ramo)
    experiences/     las cinco pantallas y sus bloques de contenido
    final/           la gran animación final
    shared/          botón, transición de luz, control de sonido, animaciones
  hooks/
    useGardenProgress.ts   qué se descubrió, cuál está activa, si el final está listo
    useStageLayout.ts      forma de la pantalla (vertical / horizontal / táctil)
  lib/
    bouquet.ts       geometría del ramo final
  styles/
    tokens.css       colores, tipografías, tiempos  ← el tema, centralizado
```

---

## Detalles que quizá quieras saber

- **No hay marcador de progreso.** Cuántas semillas quedan se ve en el propio
  jardín, que cada vez tiene más flores; un contador numérico habría convertido
  la experiencia en un juego. El número sigue anunciándose a los lectores de
  pantalla.
- **El jardín recuerda lo descubierto** entre visitas. Para empezar de cero,
  abre la página añadiendo `#reset` al final de la dirección. No hay botón
  visible para no romper la experiencia. Se desactiva con
  `gardenSettings.persistProgress`.
- **No suena nada todavía.** El sistema de audio está montado pero en silencio:
  en cuanto pongas una pista en `src/data/audio.ts` aparecerá un control discreto.
  Nunca se reproduce nada sin que ella haya tocado algo antes.
- **Movimiento reducido.** Si el teléfono tiene activado "reducir movimiento",
  la experiencia se sirve sin animaciones y la escena final va directa al ramo.
- **Teclado y lectores de pantalla.** Se puede recorrer todo con el tabulador,
  `Enter` abre, `Escape` vuelve al jardín, y el foco regresa a la flor que se
  acaba de abrir.
- **GitHub Pages.** La build ya sale con rutas relativas (`base: './'` en
  `vite.config.ts`), así que se puede publicar el contenido de `dist/` tal cual,
  esté en la raíz o en un subdirectorio.
