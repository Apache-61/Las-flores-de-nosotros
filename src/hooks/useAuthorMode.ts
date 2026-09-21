import { useEffect, useState } from 'react'

/**
 * Los modos de autor, que se activan escribiendo en la dirección:
 *
 *   #author   muestra el identificador de cada elemento sobre la escena
 *   #content  abre la lista completa de elementos de contenido
 *
 * Sin ninguno de los dos, la página es exactamente el regalo: ni un
 * número, ni una etiqueta, ni rastro de herramientas.
 */
export type AuthorMode = 'off' | 'author' | 'content'

function readMode(): AuthorMode {
  if (typeof window === 'undefined') return 'off'
  const hash = window.location.hash.toLowerCase()
  if (hash.startsWith('#content')) return 'content'
  if (hash.startsWith('#author')) return 'author'
  return 'off'
}

export function useAuthorMode(): AuthorMode {
  const [mode, setMode] = useState<AuthorMode>(readMode)

  useEffect(() => {
    const update = () => setMode(readMode())
    window.addEventListener('hashchange', update)
    return () => window.removeEventListener('hashchange', update)
  }, [])

  // El atributo del <body> es el que enciende los identificadores por CSS
  useEffect(() => {
    const root = document.body
    if (mode === 'off') root.removeAttribute('data-author')
    else root.setAttribute('data-author', mode)
    return () => root.removeAttribute('data-author')
  }, [mode])

  return mode
}
