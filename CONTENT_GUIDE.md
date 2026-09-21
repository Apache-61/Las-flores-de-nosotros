# El Jardín de Nuestra Distancia — Guía de contenido

> Este archivo se genera solo. No lo edites a mano: ejecuta `npm run content:guide`
> y se vuelve a escribir a partir de `src/data/contentManifest.ts` y de los datos reales.

**98 elementos** en total, de los cuales **29 son imprescindibles**.
Ahora mismo faltan **77**.

Cada elemento tiene un identificador —`[01]`, `[02]`…— que es el mismo aquí, en el
manifiesto y en la página. Para ver esos identificadores sobre la propia experiencia,
abre la página añadiendo `#author` al final de la dirección. Para verlos como lista,
usa `#content`.

## Cómo se rellena

1. Abre `src/data/garden.ts` (o `src/data/audio.ts` para los sonidos).
2. Busca el elemento por su identificador: los textos pendientes llevan el número dentro, así: `[03 — ESCRIBE LA FRASE DE ENTRADA]`.
3. Sustituye el marcador completo, corchetes incluidos, por tu texto.
4. Las fotos, los videos y los sonidos se copian en `public/media/` y `public/audio/`, y en el archivo se escribe la ruta sin barra inicial: `media/foto.jpg`.

En cualquier texto puedes escribir `{nombre}` y se sustituye por el nombre del elemento [01].

---

## A. La entrada

### [01] Su nombre

**Qué escribir:** El nombre de la persona a la que le regalas el jardín.

**Dónde aparece:** En cualquier texto donde escribas {nombre}.

**Formato:** Una palabra o dos. Sin punto final.

**Tipo:** Texto · Obligatorio

**Dónde se edita:** `src/data/garden.ts` → `gardenContent.recipientName`

**Valor actual:** `[01 — ESCRIBE SU NOMBRE]`

**Estado:** ⬜ Pendiente

### [02] Línea sobre la frase inicial

**Qué escribir:** Una línea pequeña que aparece encima de la frase de entrada. Puedes usar {nombre}.

**Dónde aparece:** Pantalla inicial, sobre la frase grande.

**Formato:** Muy corta, 2–5 palabras. Se muestra en mayúsculas. Déjala vacía () para ocultarla.

**Tipo:** Texto · Opcional

**Dónde se edita:** `src/data/garden.ts` → `gardenContent.intro.eyebrow`

**Valor actual:** `[02 — LÍNEA PEQUEÑA]`

**Estado:** ⬜ Opcional

### [03] Frase de entrada

**Qué escribir:** La primera frase que ella va a leer, con la semilla aún sin germinar.

**Dónde aparece:** Pantalla inicial, en grande y en serif.

**Formato:** Una frase corta, de 4 a 12 palabras. Es el titular de todo el regalo.

**Tipo:** Texto · Obligatorio

**Dónde se edita:** `src/data/garden.ts` → `gardenContent.intro.message`

**Valor actual:** `[03 — ESCRIBE LA FRASE DE ENTRADA]`

**Estado:** ⬜ Pendiente

### [04] Texto del botón de entrada

**Qué escribir:** Lo que dice el botón que hace germinar la semilla.

**Dónde aparece:** Pantalla inicial, dentro del botón.

**Formato:**  2–5 palabras, en imperativo. Ya hay un texto que funciona.

**Tipo:** Texto · Opcional

**Dónde se edita:** `src/data/garden.ts` → `gardenContent.intro.action`

**Valor actual:** `Haz crecer el jardín`

**Estado:** ☑️ Ya funciona

### [05] Pista de la entrada

**Qué escribir:** Una indicación muy discreta bajo el botón.

**Dónde aparece:** Pantalla inicial, bajo el botón, en letra pequeña.

**Formato:** Muy corta. Déjala vacía () si no la quieres.

**Tipo:** Texto · Opcional

**Dónde se edita:** `src/data/garden.ts` → `gardenContent.intro.hint`

**Valor actual:** `[05 — PISTA OPCIONAL]`

**Estado:** ⬜ Opcional

---

## B. El jardín

### [06] Bienvenida al jardín

**Qué escribir:** La frase que la recibe al llegar al jardín. Se desvanece sola a los pocos segundos.

**Dónde aparece:** Arriba del jardín, justo al entrar.

**Formato:** Una frase corta, de 4 a 10 palabras.

**Tipo:** Texto · Obligatorio

**Dónde se edita:** `src/data/garden.ts` → `gardenContent.garden.welcome`

**Valor actual:** `[06 — FRASE DE BIENVENIDA AL JARDÍN]`

**Estado:** ⬜ Pendiente

### [07] Invitación a explorar

**Qué escribir:** La frase que invita a tocar las semillas, mientras queden por descubrir.

**Dónde aparece:** Abajo del jardín, en cursiva.

**Formato:** Una frase corta. Sugiere, no expliques.

**Tipo:** Texto · Obligatorio

**Dónde se edita:** `src/data/garden.ts` → `gardenContent.garden.hint`

**Valor actual:** `[07 — FRASE PARA INVITAR A EXPLORAR]`

**Estado:** ⬜ Pendiente

### [08] Cuando sólo queda la última

**Qué escribir:** Sustituye a la anterior cuando ya descubrió las cinco primeras semillas.

**Dónde aparece:** Abajo del jardín, con cinco flores ya abiertas.

**Formato:** Una frase corta que anticipe el final.

**Tipo:** Texto · Obligatorio

**Dónde se edita:** `src/data/garden.ts` → `gardenContent.garden.readyForFinal`

**Valor actual:** `[08 — FRASE CUANDO SÓLO QUEDA LA ÚLTIMA SEMILLA]`

**Estado:** ⬜ Pendiente

### [09] Cuando ya lo descubrió todo

**Qué escribir:** La frase del jardín una vez vista también la escena final.

**Dónde aparece:** Abajo del jardín, al volver después del ramo.

**Formato:** Una frase corta de cierre.

**Tipo:** Texto · Obligatorio

**Dónde se edita:** `src/data/garden.ts` → `gardenContent.garden.completed`

**Valor actual:** `[09 — FRASE CUANDO YA LO DESCUBRIÓ TODO]`

**Estado:** ⬜ Pendiente

### [10] Palabra del progreso

**Qué escribir:** La palabra que usan los lectores de pantalla para el progreso ("2 de 6 descubiertas").

**Dónde aparece:** No se ve: sólo la oyen los lectores de pantalla.

**Formato:** Una palabra en plural femenino.

**Tipo:** Texto · Opcional

**Dónde se edita:** `src/data/garden.ts` → `gardenContent.garden.progressLabel`

**Valor actual:** `descubiertas`

**Estado:** ☑️ Ya funciona

---

## C. Semilla 01

### [11] Título de la semilla 01

**Qué escribir:** El nombre de esta semilla. Es lo que ella ve al pasar por encima.

**Dónde aparece:** En el jardín, junto a la semilla, al apuntarla con el ratón o el teclado.

**Formato:** 2–5 palabras.

**Tipo:** Texto · Obligatorio

**Dónde se edita:** `src/data/garden.ts` → `seeds.seed-01.label`

**Valor actual:** `[11 — TÍTULO DE LA SEMILLA 01]`

**Estado:** ⬜ Pendiente

### [12] Subtítulo de la semilla 01

**Qué escribir:** Una línea aún más pequeña bajo el título de la semilla.

**Dónde aparece:** En el jardín, bajo el título de la semilla.

**Formato:** 2–4 palabras.

**Tipo:** Texto · Opcional

**Dónde se edita:** `src/data/garden.ts` → `seeds.seed-01.subtitle`

**Valor actual:** `[12 — SUBTÍTULO 01]`

**Estado:** ⬜ Opcional

### [13] Descripción accesible 01

**Qué escribir:** Cómo describe esta semilla un lector de pantalla.

**Dónde aparece:** No se ve: sólo la oyen los lectores de pantalla.

**Formato:** Una frase descriptiva. Ya hay una que funciona.

**Tipo:** Texto · Opcional

**Dónde se edita:** `src/data/garden.ts` → `seeds.seed-01.ariaLabel`

**Valor actual:** `Primera semilla del jardín`

**Estado:** ☑️ Ya funciona

### [14] Encabezado de la experiencia 01

**Qué escribir:** La línea pequeña sobre el título, dentro de la pantalla que abre esta semilla.

**Dónde aparece:** Arriba de la experiencia, en mayúsculas pequeñas.

**Formato:** 2–5 palabras.

**Tipo:** Texto · Opcional

**Dónde se edita:** `src/data/garden.ts` → `seeds.seed-01.experience.eyebrow`

**Valor actual:** `[14 — ENCABEZADO DE LA EXPERIENCIA 01]`

**Estado:** ⬜ Opcional

### [15] Título de la experiencia 01

**Qué escribir:** El título grande de la pantalla que abre esta semilla.

**Dónde aparece:** Arriba de la experiencia, en grande y en serif.

**Formato:** 2–6 palabras.

**Tipo:** Texto · Obligatorio

**Dónde se edita:** `src/data/garden.ts` → `seeds.seed-01.experience.title`

**Valor actual:** `[15 — TÍTULO DE LA EXPERIENCIA 01]`

**Estado:** ⬜ Pendiente

### [16] Subtítulo de la experiencia 01

**Qué escribir:** Una línea bajo el título que sitúa lo que va a leer.

**Dónde aparece:** Bajo el título de la experiencia.

**Formato:** Una frase corta.

**Tipo:** Texto · Opcional

**Dónde se edita:** `src/data/garden.ts` → `seeds.seed-01.experience.subtitle`

**Valor actual:** `[16 — SUBTÍTULO DE LA EXPERIENCIA 01]`

**Estado:** ⬜ Opcional

### [17] Frase de cierre 01

**Qué escribir:** La frase que remata esta sección, justo antes del botón para volver.

**Dónde aparece:** Al final de la experiencia, en cursiva.

**Formato:** Una frase corta y emocional.

**Tipo:** Texto · Opcional

**Dónde se edita:** `src/data/garden.ts` → `seeds.seed-01.experience.closingWhisper`

**Valor actual:** `[17 — FRASE AL CERRAR ESTA SECCIÓN]`

**Estado:** ⬜ Opcional

### [18] Botón de volver 01

**Qué escribir:** El texto del botón que devuelve al jardín.

**Dónde aparece:** Al final de la experiencia, dentro del botón.

**Formato:** 2–4 palabras. Ya hay un texto que funciona.

**Tipo:** Texto · Opcional

**Dónde se edita:** `src/data/garden.ts` → `seeds.seed-01.experience.backLabel`

**Valor actual:** `Volver al jardín`

**Estado:** ☑️ Ya funciona

### [19] Encabezado del texto

**Qué escribir:** Un pequeño encabezado sobre el cuerpo del texto.

**Dónde aparece:** Dentro de la experiencia 01, sobre los párrafos.

**Formato:** 2–5 palabras. Déjalo vacío () si no lo quieres.

**Tipo:** Texto · Opcional

**Dónde se edita:** `src/data/garden.ts` → `seeds.seed-01.experience.blocks.0.heading`

**Valor actual:** `[19 — ENCABEZADO DEL TEXTO]`

**Estado:** ⬜ Opcional

### [20] Cuerpo del texto

**Qué escribir:** El texto largo de esta sección: la carta, el recuerdo, lo que quieras contarle.

**Dónde aparece:** Dentro de la experiencia 01, como párrafos.

**Formato:** Una lista: cada texto entre comillas es un párrafo. Añade tantos como quieras.

**Tipo:** Párrafos · Obligatorio

**Dónde se edita:** `src/data/garden.ts` → `seeds.seed-01.experience.blocks.0.paragraphs`

**Valor actual:** `[20 — ESCRIBE AQUÍ TU TEXTO] · [ESCRIBE AQUÍ EL SEGUNDO PÁRRAFO. Puedes añadir tantos como quieras, separados por comas.…`

**Estado:** ⬜ Pendiente

### [21] Frase destacada

**Qué escribir:** Una frase suelta que se muestra centrada y en cursiva, separada del resto.

**Dónde aparece:** Dentro de la experiencia 01, entre dos líneas finas.

**Formato:** Una sola frase, corta.

**Tipo:** Frase · Opcional

**Dónde se edita:** `src/data/garden.ts` → `seeds.seed-01.experience.blocks.1.text`

**Valor actual:** `[21 — ESCRIBE UNA FRASE CORTA]`

**Estado:** ⬜ Opcional

### [22] Firma de la frase

**Qué escribir:** Quién la dijo o cuándo: una firma o una fecha bajo la frase destacada.

**Dónde aparece:** Bajo la frase destacada, en mayúsculas pequeñas.

**Formato:** Muy corta. Déjala vacía () si no la quieres.

**Tipo:** Texto · Opcional

**Dónde se edita:** `src/data/garden.ts` → `seeds.seed-01.experience.blocks.1.attribution`

**Valor actual:** `[22 — FIRMA O FECHA]`

**Estado:** ⬜ Opcional

---

## D. Semilla 02

### [23] Título de la semilla 02

**Qué escribir:** El nombre de esta semilla. Es lo que ella ve al pasar por encima.

**Dónde aparece:** En el jardín, junto a la semilla, al apuntarla con el ratón o el teclado.

**Formato:** 2–5 palabras.

**Tipo:** Texto · Obligatorio

**Dónde se edita:** `src/data/garden.ts` → `seeds.seed-02.label`

**Valor actual:** `[23 — TÍTULO DE LA SEMILLA 02]`

**Estado:** ⬜ Pendiente

### [24] Subtítulo de la semilla 02

**Qué escribir:** Una línea aún más pequeña bajo el título de la semilla.

**Dónde aparece:** En el jardín, bajo el título de la semilla.

**Formato:** 2–4 palabras.

**Tipo:** Texto · Opcional

**Dónde se edita:** `src/data/garden.ts` → `seeds.seed-02.subtitle`

**Valor actual:** `[24 — SUBTÍTULO 02]`

**Estado:** ⬜ Opcional

### [25] Descripción accesible 02

**Qué escribir:** Cómo describe esta semilla un lector de pantalla.

**Dónde aparece:** No se ve: sólo la oyen los lectores de pantalla.

**Formato:** Una frase descriptiva. Ya hay una que funciona.

**Tipo:** Texto · Opcional

**Dónde se edita:** `src/data/garden.ts` → `seeds.seed-02.ariaLabel`

**Valor actual:** `Segunda semilla del jardín`

**Estado:** ☑️ Ya funciona

### [26] Encabezado de la experiencia 02

**Qué escribir:** La línea pequeña sobre el título, dentro de la pantalla que abre esta semilla.

**Dónde aparece:** Arriba de la experiencia, en mayúsculas pequeñas.

**Formato:** 2–5 palabras.

**Tipo:** Texto · Opcional

**Dónde se edita:** `src/data/garden.ts` → `seeds.seed-02.experience.eyebrow`

**Valor actual:** `[26 — ENCABEZADO DE LA EXPERIENCIA 02]`

**Estado:** ⬜ Opcional

### [27] Título de la experiencia 02

**Qué escribir:** El título grande de la pantalla que abre esta semilla.

**Dónde aparece:** Arriba de la experiencia, en grande y en serif.

**Formato:** 2–6 palabras.

**Tipo:** Texto · Obligatorio

**Dónde se edita:** `src/data/garden.ts` → `seeds.seed-02.experience.title`

**Valor actual:** `[27 — TÍTULO DE LA EXPERIENCIA 02]`

**Estado:** ⬜ Pendiente

### [28] Subtítulo de la experiencia 02

**Qué escribir:** Una línea bajo el título que sitúa lo que va a leer.

**Dónde aparece:** Bajo el título de la experiencia.

**Formato:** Una frase corta.

**Tipo:** Texto · Opcional

**Dónde se edita:** `src/data/garden.ts` → `seeds.seed-02.experience.subtitle`

**Valor actual:** `[28 — SUBTÍTULO DE LA EXPERIENCIA 02]`

**Estado:** ⬜ Opcional

### [29] Frase de cierre 02

**Qué escribir:** La frase que remata esta sección, justo antes del botón para volver.

**Dónde aparece:** Al final de la experiencia, en cursiva.

**Formato:** Una frase corta y emocional.

**Tipo:** Texto · Opcional

**Dónde se edita:** `src/data/garden.ts` → `seeds.seed-02.experience.closingWhisper`

**Valor actual:** `[29 — FRASE AL CERRAR ESTA SECCIÓN]`

**Estado:** ⬜ Opcional

### [30] Botón de volver 02

**Qué escribir:** El texto del botón que devuelve al jardín.

**Dónde aparece:** Al final de la experiencia, dentro del botón.

**Formato:** 2–4 palabras. Ya hay un texto que funciona.

**Tipo:** Texto · Opcional

**Dónde se edita:** `src/data/garden.ts` → `seeds.seed-02.experience.backLabel`

**Valor actual:** `Volver al jardín`

**Estado:** ☑️ Ya funciona

### [31] Introducción a las fotos

**Qué escribir:** Un texto breve que presenta las fotografías.

**Dónde aparece:** Dentro de la experiencia 02, antes de las fotos.

**Formato:** Una lista de párrafos. Puede ser uno solo.

**Tipo:** Párrafos · Opcional

**Dónde se edita:** `src/data/garden.ts` → `seeds.seed-02.experience.blocks.0.paragraphs`

**Valor actual:** `[31 — ESCRIBE UNA INTRODUCCIÓN PARA LAS FOTOS]`

**Estado:** ⬜ Opcional

### [32] Encabezado de la galería

**Qué escribir:** El encabezado sobre el conjunto de fotografías.

**Dónde aparece:** Dentro de la experiencia 02, sobre las fotos.

**Formato:** 2–5 palabras.

**Tipo:** Texto · Opcional

**Dónde se edita:** `src/data/garden.ts` → `seeds.seed-02.experience.blocks.1.heading`

**Valor actual:** `[32 — ENCABEZADO DE LA GALERÍA]`

**Estado:** ⬜ Opcional

### [33] Fotografía 01

**Qué escribir:** Una fotografía: el archivo, su descripción y su pie.

**Dónde aparece:** Dentro de la experiencia 02, en la galería.

**Formato:** Copia la imagen en public/media/ y escribe src: 'media/tu-foto.jpg' (sin barra inicial). `alt` describe la foto para quien no pueda verla; `caption` es el pie visible.

**Tipo:** Fotografía · Obligatorio

**Dónde se edita:** `src/data/garden.ts` → `seeds.seed-02.experience.blocks.1.items.0`

**Valor actual:** `src: null · alt: [DESCRIBE LA FOTO 01] · caption: [33 — AGREGA LA FOTO 01]`

**Estado:** ⬜ Pendiente

### [34] Fotografía 02

**Qué escribir:** Una fotografía: el archivo, su descripción y su pie.

**Dónde aparece:** Dentro de la experiencia 02, en la galería.

**Formato:** Copia la imagen en public/media/ y escribe src: 'media/tu-foto.jpg' (sin barra inicial). `alt` describe la foto para quien no pueda verla; `caption` es el pie visible.

**Tipo:** Fotografía · Obligatorio

**Dónde se edita:** `src/data/garden.ts` → `seeds.seed-02.experience.blocks.1.items.1`

**Valor actual:** `src: null · alt: [DESCRIBE LA FOTO 02] · caption: [34 — AGREGA LA FOTO 02]`

**Estado:** ⬜ Pendiente

### [35] Fotografía 03

**Qué escribir:** Una fotografía: el archivo, su descripción y su pie.

**Dónde aparece:** Dentro de la experiencia 02, en la galería.

**Formato:** Copia la imagen en public/media/ y escribe src: 'media/tu-foto.jpg' (sin barra inicial). `alt` describe la foto para quien no pueda verla; `caption` es el pie visible.

**Tipo:** Fotografía · Obligatorio

**Dónde se edita:** `src/data/garden.ts` → `seeds.seed-02.experience.blocks.1.items.2`

**Valor actual:** `src: null · alt: [DESCRIBE LA FOTO 03] · caption: [35 — AGREGA LA FOTO 03]`

**Estado:** ⬜ Pendiente

---

## E. Semilla 03

### [36] Título de la semilla 03

**Qué escribir:** El nombre de esta semilla. Es lo que ella ve al pasar por encima.

**Dónde aparece:** En el jardín, junto a la semilla, al apuntarla con el ratón o el teclado.

**Formato:** 2–5 palabras.

**Tipo:** Texto · Obligatorio

**Dónde se edita:** `src/data/garden.ts` → `seeds.seed-03.label`

**Valor actual:** `[36 — TÍTULO DE LA SEMILLA 03]`

**Estado:** ⬜ Pendiente

### [37] Subtítulo de la semilla 03

**Qué escribir:** Una línea aún más pequeña bajo el título de la semilla.

**Dónde aparece:** En el jardín, bajo el título de la semilla.

**Formato:** 2–4 palabras.

**Tipo:** Texto · Opcional

**Dónde se edita:** `src/data/garden.ts` → `seeds.seed-03.subtitle`

**Valor actual:** `[37 — SUBTÍTULO 03]`

**Estado:** ⬜ Opcional

### [38] Descripción accesible 03

**Qué escribir:** Cómo describe esta semilla un lector de pantalla.

**Dónde aparece:** No se ve: sólo la oyen los lectores de pantalla.

**Formato:** Una frase descriptiva. Ya hay una que funciona.

**Tipo:** Texto · Opcional

**Dónde se edita:** `src/data/garden.ts` → `seeds.seed-03.ariaLabel`

**Valor actual:** `Tercera semilla del jardín`

**Estado:** ☑️ Ya funciona

### [39] Encabezado de la experiencia 03

**Qué escribir:** La línea pequeña sobre el título, dentro de la pantalla que abre esta semilla.

**Dónde aparece:** Arriba de la experiencia, en mayúsculas pequeñas.

**Formato:** 2–5 palabras.

**Tipo:** Texto · Opcional

**Dónde se edita:** `src/data/garden.ts` → `seeds.seed-03.experience.eyebrow`

**Valor actual:** `[39 — ENCABEZADO DE LA EXPERIENCIA 03]`

**Estado:** ⬜ Opcional

### [40] Título de la experiencia 03

**Qué escribir:** El título grande de la pantalla que abre esta semilla.

**Dónde aparece:** Arriba de la experiencia, en grande y en serif.

**Formato:** 2–6 palabras.

**Tipo:** Texto · Obligatorio

**Dónde se edita:** `src/data/garden.ts` → `seeds.seed-03.experience.title`

**Valor actual:** `[40 — TÍTULO DE LA EXPERIENCIA 03]`

**Estado:** ⬜ Pendiente

### [41] Subtítulo de la experiencia 03

**Qué escribir:** Una línea bajo el título que sitúa lo que va a leer.

**Dónde aparece:** Bajo el título de la experiencia.

**Formato:** Una frase corta.

**Tipo:** Texto · Opcional

**Dónde se edita:** `src/data/garden.ts` → `seeds.seed-03.experience.subtitle`

**Valor actual:** `[41 — SUBTÍTULO DE LA EXPERIENCIA 03]`

**Estado:** ⬜ Opcional

### [42] Frase de cierre 03

**Qué escribir:** La frase que remata esta sección, justo antes del botón para volver.

**Dónde aparece:** Al final de la experiencia, en cursiva.

**Formato:** Una frase corta y emocional.

**Tipo:** Texto · Opcional

**Dónde se edita:** `src/data/garden.ts` → `seeds.seed-03.experience.closingWhisper`

**Valor actual:** `[42 — FRASE AL CERRAR ESTA SECCIÓN]`

**Estado:** ⬜ Opcional

### [43] Botón de volver 03

**Qué escribir:** El texto del botón que devuelve al jardín.

**Dónde aparece:** Al final de la experiencia, dentro del botón.

**Formato:** 2–4 palabras. Ya hay un texto que funciona.

**Tipo:** Texto · Opcional

**Dónde se edita:** `src/data/garden.ts` → `seeds.seed-03.experience.backLabel`

**Valor actual:** `Volver al jardín`

**Estado:** ☑️ Ya funciona

### [44] Encabezado de la música

**Qué escribir:** El encabezado sobre la lista de canciones.

**Dónde aparece:** Dentro de la experiencia 03, sobre la música.

**Formato:** 2–5 palabras.

**Tipo:** Texto · Opcional

**Dónde se edita:** `src/data/garden.ts` → `seeds.seed-03.experience.blocks.0.heading`

**Valor actual:** `[44 — ENCABEZADO DE LA MÚSICA]`

**Estado:** ⬜ Opcional

### [45] Playlist

**Qué escribir:** La lista de reproducción, incrustada en la página.

**Dónde aparece:** Dentro de la experiencia 03, como reproductor.

**Formato:** La URL de INSERTAR, no la de compartir. En Spotify: ... → Compartir → Insertar → copia el src del iframe (empieza por https://open.spotify.com/embed/). Déjalo en null y se muestra sólo la lista de abajo.

**Tipo:** Playlist · Opcional

**Dónde se edita:** `src/data/garden.ts` → `seeds.seed-03.experience.blocks.0.embedUrl`

**Valor actual:** `null`

**Estado:** ⬜ Opcional

### [46] Canción 01

**Qué escribir:** Una canción de la lista: título, artista y por qué es vuestra.

**Dónde aparece:** Dentro de la experiencia 03, en la lista numerada.

**Formato:** Tres textos: `title`, `artist` y `note` (la nota es opcional).

**Tipo:** Canción · Obligatorio

**Dónde se edita:** `src/data/garden.ts` → `seeds.seed-03.experience.blocks.0.tracks.0`

**Valor actual:** `title: [46 — CANCIÓN 01] · artist: [ARTISTA] · note: [POR QUÉ ESTA CANCIÓN]`

**Estado:** ⬜ Pendiente

### [47] Canción 02

**Qué escribir:** Una canción de la lista: título, artista y por qué es vuestra.

**Dónde aparece:** Dentro de la experiencia 03, en la lista numerada.

**Formato:** Tres textos: `title`, `artist` y `note` (la nota es opcional).

**Tipo:** Canción · Obligatorio

**Dónde se edita:** `src/data/garden.ts` → `seeds.seed-03.experience.blocks.0.tracks.1`

**Valor actual:** `title: [47 — CANCIÓN 02] · artist: [ARTISTA] · note: [POR QUÉ ESTA CANCIÓN]`

**Estado:** ⬜ Pendiente

### [48] Canción 03

**Qué escribir:** Una canción de la lista: título, artista y por qué es vuestra.

**Dónde aparece:** Dentro de la experiencia 03, en la lista numerada.

**Formato:** Tres textos: `title`, `artist` y `note` (la nota es opcional).

**Tipo:** Canción · Obligatorio

**Dónde se edita:** `src/data/garden.ts` → `seeds.seed-03.experience.blocks.0.tracks.2`

**Valor actual:** `title: [48 — CANCIÓN 03] · artist: [ARTISTA] · note: [POR QUÉ ESTA CANCIÓN]`

**Estado:** ⬜ Pendiente

### [49] Texto sobre la música

**Qué escribir:** Un texto que acompaña a la música.

**Dónde aparece:** Dentro de la experiencia 03, bajo las canciones.

**Formato:** Una lista de párrafos.

**Tipo:** Párrafos · Opcional

**Dónde se edita:** `src/data/garden.ts` → `seeds.seed-03.experience.blocks.1.paragraphs`

**Valor actual:** `[49 — ESCRIBE ALGO SOBRE ESTA MÚSICA]`

**Estado:** ⬜ Opcional

---

## F. Semilla 04

### [50] Título de la semilla 04

**Qué escribir:** El nombre de esta semilla. Es lo que ella ve al pasar por encima.

**Dónde aparece:** En el jardín, junto a la semilla, al apuntarla con el ratón o el teclado.

**Formato:** 2–5 palabras.

**Tipo:** Texto · Obligatorio

**Dónde se edita:** `src/data/garden.ts` → `seeds.seed-04.label`

**Valor actual:** `[50 — TÍTULO DE LA SEMILLA 04]`

**Estado:** ⬜ Pendiente

### [51] Subtítulo de la semilla 04

**Qué escribir:** Una línea aún más pequeña bajo el título de la semilla.

**Dónde aparece:** En el jardín, bajo el título de la semilla.

**Formato:** 2–4 palabras.

**Tipo:** Texto · Opcional

**Dónde se edita:** `src/data/garden.ts` → `seeds.seed-04.subtitle`

**Valor actual:** `[51 — SUBTÍTULO 04]`

**Estado:** ⬜ Opcional

### [52] Descripción accesible 04

**Qué escribir:** Cómo describe esta semilla un lector de pantalla.

**Dónde aparece:** No se ve: sólo la oyen los lectores de pantalla.

**Formato:** Una frase descriptiva. Ya hay una que funciona.

**Tipo:** Texto · Opcional

**Dónde se edita:** `src/data/garden.ts` → `seeds.seed-04.ariaLabel`

**Valor actual:** `Cuarta semilla del jardín`

**Estado:** ☑️ Ya funciona

### [53] Encabezado de la experiencia 04

**Qué escribir:** La línea pequeña sobre el título, dentro de la pantalla que abre esta semilla.

**Dónde aparece:** Arriba de la experiencia, en mayúsculas pequeñas.

**Formato:** 2–5 palabras.

**Tipo:** Texto · Opcional

**Dónde se edita:** `src/data/garden.ts` → `seeds.seed-04.experience.eyebrow`

**Valor actual:** `[53 — ENCABEZADO DE LA EXPERIENCIA 04]`

**Estado:** ⬜ Opcional

### [54] Título de la experiencia 04

**Qué escribir:** El título grande de la pantalla que abre esta semilla.

**Dónde aparece:** Arriba de la experiencia, en grande y en serif.

**Formato:** 2–6 palabras.

**Tipo:** Texto · Obligatorio

**Dónde se edita:** `src/data/garden.ts` → `seeds.seed-04.experience.title`

**Valor actual:** `[54 — TÍTULO DE LA EXPERIENCIA 04]`

**Estado:** ⬜ Pendiente

### [55] Subtítulo de la experiencia 04

**Qué escribir:** Una línea bajo el título que sitúa lo que va a leer.

**Dónde aparece:** Bajo el título de la experiencia.

**Formato:** Una frase corta.

**Tipo:** Texto · Opcional

**Dónde se edita:** `src/data/garden.ts` → `seeds.seed-04.experience.subtitle`

**Valor actual:** `[55 — SUBTÍTULO DE LA EXPERIENCIA 04]`

**Estado:** ⬜ Opcional

### [56] Frase de cierre 04

**Qué escribir:** La frase que remata esta sección, justo antes del botón para volver.

**Dónde aparece:** Al final de la experiencia, en cursiva.

**Formato:** Una frase corta y emocional.

**Tipo:** Texto · Opcional

**Dónde se edita:** `src/data/garden.ts` → `seeds.seed-04.experience.closingWhisper`

**Valor actual:** `[56 — FRASE AL CERRAR ESTA SECCIÓN]`

**Estado:** ⬜ Opcional

### [57] Botón de volver 04

**Qué escribir:** El texto del botón que devuelve al jardín.

**Dónde aparece:** Al final de la experiencia, dentro del botón.

**Formato:** 2–4 palabras. Ya hay un texto que funciona.

**Tipo:** Texto · Opcional

**Dónde se edita:** `src/data/garden.ts` → `seeds.seed-04.experience.backLabel`

**Valor actual:** `Volver al jardín`

**Estado:** ☑️ Ya funciona

### [58] Encabezado del video

**Qué escribir:** El encabezado sobre el video.

**Dónde aparece:** Dentro de la experiencia 04, sobre el video.

**Formato:** 2–5 palabras.

**Tipo:** Texto · Opcional

**Dónde se edita:** `src/data/garden.ts` → `seeds.seed-04.experience.blocks.0.heading`

**Valor actual:** `[58 — ENCABEZADO DEL VIDEO]`

**Estado:** ⬜ Opcional

### [59] Tipo de video

**Qué escribir:** Si el video es un archivo tuyo o está en YouTube/Vimeo.

**Dónde aparece:** No se ve: decide cómo se reproduce.

**Formato:** 'file' para un archivo propio, 'embed' para YouTube o Vimeo.

**Tipo:** Opción · Opcional

**Dónde se edita:** `src/data/garden.ts` → `seeds.seed-04.experience.blocks.0.mode`

**Valor actual:** `file`

**Estado:** ☑️ Ya funciona

### [60] Video

**Qué escribir:** El video que quieres que vea.

**Dónde aparece:** Dentro de la experiencia 04, como reproductor.

**Formato:** Archivo propio: cópialo en public/media/ y escribe 'media/tu-video.mp4'. YouTube/Vimeo: usa la URL de /embed/ y pon mode: 'embed'.

**Tipo:** Video · Obligatorio

**Dónde se edita:** `src/data/garden.ts` → `seeds.seed-04.experience.blocks.0.src`

**Valor actual:** `null`

**Estado:** ⬜ Pendiente

### [61] Portada del video

**Qué escribir:** La imagen que se ve antes de darle al play.

**Dónde aparece:** Dentro de la experiencia 04, sobre el video parado.

**Formato:** Cópiala en public/media/ y escribe 'media/portada.jpg'. Opcional.

**Tipo:** Fotografía · Opcional

**Dónde se edita:** `src/data/garden.ts` → `seeds.seed-04.experience.blocks.0.poster`

**Valor actual:** `null`

**Estado:** ⬜ Opcional

### [62] Pie del video

**Qué escribir:** El texto que explica qué es ese video.

**Dónde aparece:** Dentro de la experiencia 04, bajo el video.

**Formato:** Una o dos frases.

**Tipo:** Texto · Opcional

**Dónde se edita:** `src/data/garden.ts` → `seeds.seed-04.experience.blocks.0.caption`

**Valor actual:** `[62 — DESCRIBE EL VIDEO]`

**Estado:** ⬜ Opcional

### [63] Encabezado de los datos

**Qué escribir:** El encabezado sobre los datos con etiqueta.

**Dónde aparece:** Dentro de la experiencia 04, sobre los datos.

**Formato:** 2–5 palabras.

**Tipo:** Texto · Opcional

**Dónde se edita:** `src/data/garden.ts` → `seeds.seed-04.experience.blocks.1.heading`

**Valor actual:** `[63 — ENCABEZADO DE LOS DATOS]`

**Estado:** ⬜ Opcional

### [64] Dato 01

**Qué escribir:** Un dato con su etiqueta: una fecha, un número, una cuenta que lleváis.

**Dónde aparece:** Dentro de la experiencia 04, en las tarjetas de datos.

**Formato:** Dos textos: `label` (la etiqueta pequeña) y `value` (el dato grande).

**Tipo:** Dato · Opcional

**Dónde se edita:** `src/data/garden.ts` → `seeds.seed-04.experience.blocks.1.items.0`

**Valor actual:** `label: [64 — DATO 01] · value: [DATO 01]`

**Estado:** ⬜ Opcional

### [65] Dato 02

**Qué escribir:** Un dato con su etiqueta: una fecha, un número, una cuenta que lleváis.

**Dónde aparece:** Dentro de la experiencia 04, en las tarjetas de datos.

**Formato:** Dos textos: `label` (la etiqueta pequeña) y `value` (el dato grande).

**Tipo:** Dato · Opcional

**Dónde se edita:** `src/data/garden.ts` → `seeds.seed-04.experience.blocks.1.items.1`

**Valor actual:** `label: [65 — DATO 02] · value: [DATO 02]`

**Estado:** ⬜ Opcional

### [66] Dato 03

**Qué escribir:** Un dato con su etiqueta: una fecha, un número, una cuenta que lleváis.

**Dónde aparece:** Dentro de la experiencia 04, en las tarjetas de datos.

**Formato:** Dos textos: `label` (la etiqueta pequeña) y `value` (el dato grande).

**Tipo:** Dato · Opcional

**Dónde se edita:** `src/data/garden.ts` → `seeds.seed-04.experience.blocks.1.items.2`

**Valor actual:** `label: [66 — DATO 03] · value: [DATO 03]`

**Estado:** ⬜ Opcional

---

## G. Semilla 05

### [67] Título de la semilla 05

**Qué escribir:** El nombre de esta semilla. Es lo que ella ve al pasar por encima.

**Dónde aparece:** En el jardín, junto a la semilla, al apuntarla con el ratón o el teclado.

**Formato:** 2–5 palabras.

**Tipo:** Texto · Obligatorio

**Dónde se edita:** `src/data/garden.ts` → `seeds.seed-05.label`

**Valor actual:** `[67 — TÍTULO DE LA SEMILLA 05]`

**Estado:** ⬜ Pendiente

### [68] Subtítulo de la semilla 05

**Qué escribir:** Una línea aún más pequeña bajo el título de la semilla.

**Dónde aparece:** En el jardín, bajo el título de la semilla.

**Formato:** 2–4 palabras.

**Tipo:** Texto · Opcional

**Dónde se edita:** `src/data/garden.ts` → `seeds.seed-05.subtitle`

**Valor actual:** `[68 — SUBTÍTULO 05]`

**Estado:** ⬜ Opcional

### [69] Descripción accesible 05

**Qué escribir:** Cómo describe esta semilla un lector de pantalla.

**Dónde aparece:** No se ve: sólo la oyen los lectores de pantalla.

**Formato:** Una frase descriptiva. Ya hay una que funciona.

**Tipo:** Texto · Opcional

**Dónde se edita:** `src/data/garden.ts` → `seeds.seed-05.ariaLabel`

**Valor actual:** `Quinta semilla del jardín`

**Estado:** ☑️ Ya funciona

### [70] Encabezado de la experiencia 05

**Qué escribir:** La línea pequeña sobre el título, dentro de la pantalla que abre esta semilla.

**Dónde aparece:** Arriba de la experiencia, en mayúsculas pequeñas.

**Formato:** 2–5 palabras.

**Tipo:** Texto · Opcional

**Dónde se edita:** `src/data/garden.ts` → `seeds.seed-05.experience.eyebrow`

**Valor actual:** `[70 — ENCABEZADO DE LA EXPERIENCIA 05]`

**Estado:** ⬜ Opcional

### [71] Título de la experiencia 05

**Qué escribir:** El título grande de la pantalla que abre esta semilla.

**Dónde aparece:** Arriba de la experiencia, en grande y en serif.

**Formato:** 2–6 palabras.

**Tipo:** Texto · Obligatorio

**Dónde se edita:** `src/data/garden.ts` → `seeds.seed-05.experience.title`

**Valor actual:** `[71 — TÍTULO DE LA EXPERIENCIA 05]`

**Estado:** ⬜ Pendiente

### [72] Subtítulo de la experiencia 05

**Qué escribir:** Una línea bajo el título que sitúa lo que va a leer.

**Dónde aparece:** Bajo el título de la experiencia.

**Formato:** Una frase corta.

**Tipo:** Texto · Opcional

**Dónde se edita:** `src/data/garden.ts` → `seeds.seed-05.experience.subtitle`

**Valor actual:** `[72 — SUBTÍTULO DE LA EXPERIENCIA 05]`

**Estado:** ⬜ Opcional

### [73] Frase de cierre 05

**Qué escribir:** La frase que remata esta sección, justo antes del botón para volver.

**Dónde aparece:** Al final de la experiencia, en cursiva.

**Formato:** Una frase corta y emocional.

**Tipo:** Texto · Opcional

**Dónde se edita:** `src/data/garden.ts` → `seeds.seed-05.experience.closingWhisper`

**Valor actual:** `[73 — FRASE AL CERRAR ESTA SECCIÓN]`

**Estado:** ⬜ Opcional

### [74] Botón de volver 05

**Qué escribir:** El texto del botón que devuelve al jardín.

**Dónde aparece:** Al final de la experiencia, dentro del botón.

**Formato:** 2–4 palabras. Ya hay un texto que funciona.

**Tipo:** Texto · Opcional

**Dónde se edita:** `src/data/garden.ts` → `seeds.seed-05.experience.backLabel`

**Valor actual:** `Volver al jardín`

**Estado:** ☑️ Ya funciona

### [75] Encabezado del mapa

**Qué escribir:** El encabezado sobre el mapa.

**Dónde aparece:** Dentro de la experiencia 05, sobre el mapa.

**Formato:** 2–5 palabras.

**Tipo:** Texto · Opcional

**Dónde se edita:** `src/data/garden.ts` → `seeds.seed-05.experience.blocks.0.heading`

**Valor actual:** `[75 — ENCABEZADO DEL MAPA]`

**Estado:** ⬜ Opcional

### [76] Lugar de origen

**Qué escribir:** Uno de los dos extremos de la distancia: dónde estás tú.

**Dónde aparece:** Dentro de la experiencia 05, a la izquierda del mapa.

**Formato:** Dos textos: `label` (el nombre) y `detail` (ciudad, país, o lo que prefieras).

**Tipo:** Lugar · Obligatorio

**Dónde se edita:** `src/data/garden.ts` → `seeds.seed-05.experience.blocks.0.from`

**Valor actual:** `label: [76 — TU LUGAR] · detail: [CIUDAD, PAÍS]`

**Estado:** ⬜ Pendiente

### [77] Lugar de destino

**Qué escribir:** El otro extremo: dónde está ella.

**Dónde aparece:** Dentro de la experiencia 05, a la derecha del mapa.

**Formato:** Dos textos: `label` (el nombre) y `detail` (ciudad, país, o lo que prefieras).

**Tipo:** Lugar · Obligatorio

**Dónde se edita:** `src/data/garden.ts` → `seeds.seed-05.experience.blocks.0.to`

**Valor actual:** `label: [77 — SU LUGAR] · detail: [CIUDAD, PAÍS]`

**Estado:** ⬜ Pendiente

### [78] Distancia

**Qué escribir:** Lo que separa los dos puntos, dicho como quieras.

**Dónde aparece:** Dentro de la experiencia 05, sobre la línea que une los dos lugares.

**Formato:** Muy corto: unos kilómetros, unas horas de vuelo, lo que prefieras.

**Tipo:** Texto · Obligatorio

**Dónde se edita:** `src/data/garden.ts` → `seeds.seed-05.experience.blocks.0.distanceLabel`

**Valor actual:** `[78 — LA DISTANCIA ENTRE LOS DOS]`

**Estado:** ⬜ Pendiente

### [79] Texto del mapa

**Qué escribir:** Un texto sobre esos dos lugares.

**Dónde aparece:** Dentro de la experiencia 05, bajo el mapa.

**Formato:** Una o dos frases.

**Tipo:** Texto · Opcional

**Dónde se edita:** `src/data/garden.ts` → `seeds.seed-05.experience.blocks.0.note`

**Valor actual:** `[79 — ESCRIBE ALGO SOBRE ESTOS DOS LUGARES]`

**Estado:** ⬜ Opcional

### [80] Mapa real

**Qué escribir:** Un mapa de Google en lugar del mapa ilustrado.

**Dónde aparece:** Dentro de la experiencia 05, sustituyendo al mapa dibujado.

**Formato:** Google Maps → Compartir → Insertar un mapa → copia el valor de src. Déjalo en null y se dibuja el mapa ilustrado, que no necesita internet.

**Tipo:** Enlace · Opcional

**Dónde se edita:** `src/data/garden.ts` → `seeds.seed-05.experience.blocks.0.embedUrl`

**Valor actual:** `null`

**Estado:** ⬜ Opcional

---

## H. La última semilla

### [81] Título de la última semilla

**Qué escribir:** El nombre de la sexta semilla, la que dispara el final.

**Dónde aparece:** En el jardín, junto a la semilla del capullo dorado.

**Formato:** 2–5 palabras.

**Tipo:** Texto · Obligatorio

**Dónde se edita:** `src/data/garden.ts` → `seeds.seed-future.label`

**Valor actual:** `[81 — TÍTULO DE LA ÚLTIMA SEMILLA]`

**Estado:** ⬜ Pendiente

### [82] Subtítulo de la última semilla

**Qué escribir:** La línea pequeña bajo su título.

**Dónde aparece:** En el jardín, bajo el título de la última semilla.

**Formato:** 2–4 palabras.

**Tipo:** Texto · Opcional

**Dónde se edita:** `src/data/garden.ts` → `seeds.seed-future.subtitle`

**Valor actual:** `[82 — SUBTÍTULO DE LA ÚLTIMA SEMILLA]`

**Estado:** ⬜ Opcional

### [83] Descripción accesible de la última

**Qué escribir:** Cómo describe esta semilla un lector de pantalla.

**Dónde aparece:** No se ve: sólo la oyen los lectores de pantalla.

**Formato:** Una frase descriptiva. Ya hay una que funciona.

**Tipo:** Texto · Opcional

**Dónde se edita:** `src/data/garden.ts` → `seeds.seed-future.ariaLabel`

**Valor actual:** `La última semilla del jardín`

**Estado:** ☑️ Ya funciona

---

## I. El final

### [84] La frase final

**Qué escribir:** La frase que aparece sobre el ramo. Es el remate de todo el regalo.

**Dónde aparece:** Arriba del todo, una vez formado el ramo.

**Formato:** Una frase. Cuanto más corta, más fuerte.

**Tipo:** Texto · Obligatorio

**Dónde se edita:** `src/data/garden.ts` → `finalSequence.message`

**Valor actual:** `[84 — ESCRIBE LA FRASE FINAL]`

**Estado:** ⬜ Pendiente

### [85] Línea sobre la frase final

**Qué escribir:** Una línea pequeña encima de la frase final.

**Dónde aparece:** Sobre la frase final, en mayúsculas pequeñas.

**Formato:** Muy corta. Déjala vacía ('') si no la quieres.

**Tipo:** Texto · Opcional

**Dónde se edita:** `src/data/garden.ts` → `finalSequence.eyebrow`

**Valor actual:** `[85 — LÍNEA SOBRE LA FRASE FINAL]`

**Estado:** ⬜ Opcional

### [86] Firma final

**Qué escribir:** Tu firma bajo la frase final.

**Dónde aparece:** Bajo la frase final, en mayúsculas pequeñas.

**Formato:** Muy corta. Déjala vacía ('') si no la quieres.

**Tipo:** Texto · Opcional

**Dónde se edita:** `src/data/garden.ts` → `finalSequence.signature`

**Valor actual:** `[86 — FIRMA]`

**Estado:** ⬜ Opcional

### [87] Botón de volver del final

**Qué escribir:** El texto del enlace discreto para volver al jardín tras el ramo.

**Dónde aparece:** Abajo del todo, muy tenue, después de la frase.

**Formato:** 2–4 palabras. Ya hay un texto que funciona.

**Tipo:** Texto · Opcional

**Dónde se edita:** `src/data/garden.ts` → `finalSequence.returnLabel`

**Valor actual:** `Volver al jardín`

**Estado:** ☑️ Ya funciona

### [88] Apariencia de la frase final

**Qué escribir:** Cómo se ve la frase final: tipografía, tamaño, posición y ancho.

**Dónde aparece:** Afecta a la frase sobre el ramo.

**Formato:** `font`: 'serif' o 'sans'. `size`, `top` y `maxWidth` aceptan cualquier medida CSS.

**Tipo:** Ajuste · Opcional

**Dónde se edita:** `src/data/garden.ts` → `finalSequence.phrase`

**Valor actual:** `font: serif · size: var(--fs-final) · top: clamp(2.2rem, 9vh, 5.5rem) · maxWidth: 22ch`

**Estado:** ☑️ Ya funciona

### [89] Tiempos de la escena final

**Qué escribir:** Cuánto dura cada momento del final, en milisegundos.

**Dónde aparece:** Afecta al ritmo de la tormenta de flores y del ramo.

**Formato:** Números en milisegundos: react, expand, storm, pullback, settle y phraseDelay.

**Tipo:** Ajuste · Opcional

**Dónde se edita:** `src/data/garden.ts` → `finalSequence.timings`

**Valor actual:** `react: 1400 · expand: 3200 · storm: 2200 · pullback: 4600 · settle: 1800 · phraseDelay: 900`

**Estado:** ☑️ Ya funciona

### [90] Número de flores del ramo

**Qué escribir:** Cuántas flores forman el ramo, en móvil y en escritorio.

**Dónde aparece:** Afecta a la densidad de la tormenta y del ramo.

**Formato:** Dos números. Bájalos si algún teléfono va lento.

**Tipo:** Ajuste · Opcional

**Dónde se edita:** `src/data/garden.ts` → `finalSequence.flowerCount`

**Valor actual:** `mobile: 58 · desktop: 96`

**Estado:** ☑️ Ya funciona

### [91] Permitir volver tras el final

**Qué escribir:** Si tras el ramo aparece el enlace para volver al jardín.

**Dónde aparece:** Abajo del todo, después de la frase final.

**Formato:** true o false.

**Tipo:** Ajuste · Opcional

**Dónde se edita:** `src/data/garden.ts` → `finalSequence.allowReturnToGarden`

**Valor actual:** `true`

**Estado:** ☑️ Ya funciona

---

## J. El sonido

### [92] Música del jardín

**Qué escribir:** El archivo de sonido. Mientras esté en null no suena nada y no aparece ningún control.

**Dónde aparece:** Suena de fondo mientras explora el jardín.

**Formato:** Copia el archivo en public/audio/ y escribe 'audio/tu-sonido.mp3' (sin barra inicial).

**Tipo:** Sonido · Opcional

**Dónde se edita:** `src/data/audio.ts` → `audio.ambient.src`

**Valor actual:** `null`

**Estado:** ⬜ Opcional

### [93] Sonido de la germinación

**Qué escribir:** El archivo de sonido. Mientras esté en null no suena nada y no aparece ningún control.

**Dónde aparece:** Al tocar la semilla de la pantalla inicial.

**Formato:** Copia el archivo en public/audio/ y escribe 'audio/tu-sonido.mp3' (sin barra inicial).

**Tipo:** Sonido · Opcional

**Dónde se edita:** `src/data/audio.ts` → `audio.germination.src`

**Valor actual:** `null`

**Estado:** ⬜ Opcional

### [94] Sonido al tocar una semilla

**Qué escribir:** El archivo de sonido. Mientras esté en null no suena nada y no aparece ningún control.

**Dónde aparece:** Cada vez que abre una semilla del jardín.

**Formato:** Copia el archivo en public/audio/ y escribe 'audio/tu-sonido.mp3' (sin barra inicial).

**Tipo:** Sonido · Opcional

**Dónde se edita:** `src/data/audio.ts` → `audio.seedTap.src`

**Valor actual:** `null`

**Estado:** ⬜ Opcional

### [95] Sonido al abrirse una flor

**Qué escribir:** El archivo de sonido. Mientras esté en null no suena nada y no aparece ningún control.

**Dónde aparece:** Al volver de una experiencia, cuando la semilla florece.

**Formato:** Copia el archivo en public/audio/ y escribe 'audio/tu-sonido.mp3' (sin barra inicial).

**Tipo:** Sonido · Opcional

**Dónde se edita:** `src/data/audio.ts` → `audio.bloom.src`

**Valor actual:** `null`

**Estado:** ⬜ Opcional

### [96] Sonido del final

**Qué escribir:** El archivo de sonido. Mientras esté en null no suena nada y no aparece ningún control.

**Dónde aparece:** Al empezar la escena final.

**Formato:** Copia el archivo en public/audio/ y escribe 'audio/tu-sonido.mp3' (sin barra inicial).

**Tipo:** Sonido · Opcional

**Dónde se edita:** `src/data/audio.ts` → `audio.finale.src`

**Valor actual:** `null`

**Estado:** ⬜ Opcional

---

## K. Ajustes de la experiencia

### [97] Título de la pestaña

**Qué escribir:** Lo que se lee en la pestaña del navegador y al compartir el enlace.

**Dónde aparece:** En la pestaña del navegador.

**Formato:** Unas pocas palabras. Se edita en index.html, dentro de <title>.

**Tipo:** Título · Opcional

**Dónde se edita:** `index.html` → `meta.documentTitle`

**Valor actual:** `El Jardín de Nuestra Distancia`

**Estado:** ☑️ Ya funciona

### [98] Ajustes finos del jardín

**Qué escribir:** El ritmo y la densidad del jardín. Ya están puestos en valores que funcionan.

**Dónde aparece:** Afectan al jardín y a la pantalla inicial.

**Formato:** Seis valores: `activeSeedRotationMs` (cada cuánto cambia la semilla que invita, en ms; 0 para que no cambie), `germinationMs` (lo que tarda la germinación), `persistProgress` (si recuerda lo descubierto entre visitas; para empezar de cero abre la página con #reset), `foliageDensity` (cuánta vegetación, alrededor de 1), `particleCount` (motas de polen; 0 las quita) y `butterfly` (si cruza la mariposa).

**Tipo:** Ajuste · Opcional

**Dónde se edita:** `src/data/garden.ts` → `gardenSettings`

**Valor actual:** `activeSeedRotationMs: 9000 · germinationMs: 3200 · persistProgress: true · resetHash: #reset · foliageDensity: 1 · parti…`

**Estado:** ☑️ Ya funciona

---

## Lista de comprobación

- [ ] Completar todos los textos
- [ ] Agregar las fotografías
- [ ] Agregar el video
- [ ] Configurar la playlist
- [ ] Configurar el mapa
- [ ] Configurar los sonidos
- [ ] Escribir la frase final
- [ ] Revisar la experiencia completa
- [ ] Probar en móvil
- [ ] Probar en escritorio
- [ ] Salir del modo autor (quitar `#author` de la dirección)
- [ ] Ejecutar la build final (`npm run build`)
