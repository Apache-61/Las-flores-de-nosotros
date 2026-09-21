import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import App from './App'
import { AudioProvider } from './audio/AudioProvider'
import './styles/global.css'

const container = document.getElementById('root')
if (!container) throw new Error('No se encontró el elemento #root')

createRoot(container).render(
  <StrictMode>
    {/* `reducedMotion="user"` hace que todo el proyecto respete la
        preferencia de movimiento reducido del sistema. */}
    <MotionConfig reducedMotion="user">
      <AudioProvider>
        <App />
      </AudioProvider>
    </MotionConfig>
  </StrictMode>,
)
