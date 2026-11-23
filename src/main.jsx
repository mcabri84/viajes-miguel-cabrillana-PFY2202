import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

async function iniciarAplicacion() {
  // Esta entrega usa APIs simuladas también en la demostración publicada.
  const { worker } = await import('./mocks/browser.js')
  await worker.start({
    serviceWorker: { url: `${import.meta.env.BASE_URL}mockServiceWorker.js` },
    onUnhandledRequest: 'bypass',
  })

  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

iniciarAplicacion().catch((error) => {
  console.error('No se pudo iniciar la aplicación:', error)
  document.getElementById('root').textContent =
    'No se pudieron iniciar los servicios de demostración. Recarga la página para reintentar.'
})
