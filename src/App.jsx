import { useEffect, useState } from 'react'
import { ApolloProvider } from '@apollo/client/react'
import { HashRouter, Link, Route, Routes, useLocation } from 'react-router-dom'
import { client } from './services/apollo.js'
import { obtenerDestinos } from './services/destinos.js'
import { Destinos } from './pages/Destinos.jsx'
import { DetalleDestino } from './pages/DetalleDestino.jsx'
import { Mensaje } from './components/Mensaje.jsx'
import './App.css'

function Aplicacion() {
  const [destinos, setDestinos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [intento, setIntento] = useState(0)
  const { pathname } = useLocation()
  useEffect(() => {
    const controller = new AbortController()
    setCargando(true)
    setError('')
    obtenerDestinos(controller.signal).then(setDestinos)
      .catch((err) => { if (!controller.signal.aborted) setError(err.message) })
      .finally(() => { if (!controller.signal.aborted) setCargando(false) })
    return () => controller.abort()
  }, [intento])
  useEffect(() => { window.scrollTo(0, 0); document.title = 'Rumbo | Explora tu próximo destino' }, [pathname])
  const estado = { destinos, cargando, error, reintentar: () => setIntento((n) => n + 1) }
  return <>
    <a className="skip-link" href="#contenido" onClick={(event) => { event.preventDefault(); document.getElementById('contenido').focus() }}>Saltar al contenido</a>
    <header className="site-header"><div className="container header-inner">
      <Link to="/" className="brand" aria-label="Rumbo, inicio"><span className="brand-symbol" aria-hidden="true">r.</span>rumbo<span className="brand-dot">.</span></Link>
      <nav aria-label="Navegación principal"><Link to="/">Explorar destinos</Link></nav>
    </div></header>
    <main id="contenido" tabIndex={-1}><Routes>
      <Route path="/" element={<Destinos {...estado} />} />
      <Route path="/destinos/:destinoId" element={<DetalleDestino {...estado} />} />
      <Route path="*" element={<div className="container page-space"><Mensaje titulo="Esta página no existe"><Link to="/" className="button">Volver a destinos</Link></Mensaje></div>} />
    </Routes></main>
    <footer className="site-footer"><div className="container footer-inner"><span className="footer-brand">rumbo.</span><p>Proyecto académico · Desarrollo Frontend II</p><p>Datos y precios ficticios. No se realizan reservas.</p></div></footer>
  </>
}
export default function App() { return <ApolloProvider client={client}><HashRouter><Aplicacion /></HashRouter></ApolloProvider> }
