# Privacidad: quién puede ver el jardín

Este archivo existe porque el jardín ya no lleva textos de prueba: lleva
dos nombres, fechas reales, fotografías, un video tuyo y el lugar donde
estudia cada uno. Conviene saber, sin rodeos, quién puede llegar a eso.

## Cómo está ahora

El repositorio es **público** y el sitio se publica con **GitHub Pages**:

```
https://apache-61.github.io/Las-flores-de-nosotros/
```

Eso significa que hoy:

- Cualquiera que tenga el enlace entra, sin contraseña.
- Cualquiera puede leer el código en GitHub, y con él los textos, las
  fotos y el video, porque viven dentro del repositorio (`public/media/`).
- Poner el repositorio en privado **no** cierra el sitio: en los planes
  gratuito, Pro y Team, GitHub Pages sirve la página al público aunque el
  repositorio sea privado. Sólo GitHub Enterprise Cloud permite un Pages
  privado.
- Lo único que ya está puesto es que no lo indexen los buscadores
  (`robots.txt` y la etiqueta `noindex` en `index.html`). Eso evita que
  alguien lo encuentre buscando un nombre; no evita que entre quien tenga
  la dirección.

## Las opciones, de menos a más

### 1. Dejarlo así, con el enlace como secreto

No haces nada. La dirección no aparece en buscadores y nadie la adivina
por casualidad, pero es adivinable por alguien que sepa tu usuario de
GitHub, y el repositorio público enseña todo el contenido igual.

**Cuesta:** nada. **Protege:** poco.

### 2. Repositorio privado + un nombre de dirección impredecible

Pones el repositorio en privado (deja de verse el código y los archivos
originales) y renombras el repositorio a algo que no se pueda adivinar,
por ejemplo `jardin-a7f3c9d2e1`. La dirección pasa a ser
`https://apache-61.github.io/jardin-a7f3c9d2e1/`.

El sitio sigue siendo público para quien tenga esa dirección, pero ya no
hay una lista donde encontrarla ni un repositorio que curiosear.

**Cuesta:** cinco minutos. **Protege:** bastante, para lo que es esto.

### 3. Contraseña de verdad, moviendo el sitio a otro sitio gratuito

GitHub Pages no sabe pedir contraseña. Otros dos servicios sí, gratis, y
el proyecto se sube igual porque es una carpeta de archivos estáticos:

- **Netlify** — protección con contraseña para todo el sitio.
- **Cloudflare Pages + Cloudflare Access** — pide el correo de ella y le
  manda un código; sólo entra quien tú autorices. Gratis hasta 50
  personas.

Aquí la protección la aplica el servidor: sin la contraseña o sin el
código, no se descarga ni una foto.

**Cuesta:** media hora de configuración. **Protege:** de verdad.

### 4. Una clave dentro de la propia página

Se podría añadir una pantalla que pida una palabra antes de entrar. Hay
que decirlo con claridad: **eso no es seguridad**. Todo el contenido viaja
al navegador de todas formas, y cualquiera que sepa abrir las herramientas
del navegador lo saca sin escribir la palabra. Sirve como gesto, como
parte del regalo ("la palabra que sólo nosotros sabemos"), no como
candado. Si te gusta la idea por lo que significa, se hace; si la quieres
por seguridad, la opción 3 es la que sirve.

### 5. No publicarlo

Entregárselo como un archivo: se genera la carpeta `dist/` y se le pasa
comprimida, o se le enseña desde tu propio teléfono. No hay dirección
pública que pueda filtrarse.

**Protege:** del todo. **Cuesta:** que ella no pueda volver a abrirlo con
un enlace cuando quiera.

## Lo que se decidió

**La opción 1.** El jardín se queda como está: público, con el enlace
como único secreto, y fuera de los buscadores gracias al `robots.txt` y
al `noindex`. Es una decisión tomada a sabiendas, no un descuido.

Lo que eso significa, dicho una vez y sin dramatizar: quien tenga la
dirección entra, y quien dé con el repositorio ve los textos, las fotos y
el video. Nadie va a llegar buscando un nombre en Google, pero el enlace
es la llave y no hay otra.

Si algún día cambia de opinión, las opciones 2 y 3 siguen ahí y se
aplican después sin tocar nada de la experiencia: son cambios de dónde
vive el sitio, no de cómo funciona.

## Dos cosas a tener en cuenta pase lo que pase

- **El historial de Git recuerda.** Si el repositorio ha sido público y
  luego lo pones en privado, lo que ya se publicó pudo copiarse. Para este
  caso, con el poco tiempo que lleva, es un riesgo teórico.
- **El video pesa 25,9 MB** y viaja entero al navegador de quien entre.
  No es un problema de privacidad, sí de datos móviles: por eso la página
  no lo descarga hasta que ella le da al play (`preload="none"`), y
  mientras tanto sólo enseña la portada.
