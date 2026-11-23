import { DestinoCard } from '../components/DestinoCard.jsx'
import { Cargando, Mensaje } from '../components/Mensaje.jsx'
export function Destinos({ destinos, cargando, error, reintentar }) {
  return <>
    <section className="hero"><div className="container hero-content"><p className="eyebrow">TU PRÓXIMA HISTORIA EMPIEZA AQUÍ</p><h1>Un destino.<br/>Mil formas de descubrirlo.</h1><p className="hero-description">Explora lugares que inspiran y encuentra vuelos y hoteles para tu próximo viaje.</p><div className="hero-note"><span aria-hidden="true">✦</span> Chile, Argentina y Perú te esperan</div></div><div className="hero-orbit" aria-hidden="true"/></section>
    <section className="container catalog" aria-labelledby="destinos-titulo"><div className="section-heading"><div><p className="eyebrow">ENCUENTRA TU RUMBO</p><h2 id="destinos-titulo">Destinos para explorar</h2></div>{!cargando && !error && <span className="result-count">{destinos.length} destinos</span>}</div><p className="section-description">Elige un lugar y descubre sus actividades, vuelos y alojamientos.</p>
      {cargando ? <Cargando/> : error ? <Mensaje error titulo="No pudimos cargar los destinos"><p>{error}</p><button className="button" onClick={reintentar}>Reintentar</button></Mensaje> : destinos.length === 0 ? <Mensaje titulo="No hay destinos disponibles"><p>Vuelve a consultar más adelante.</p></Mensaje> : <div className="destination-grid">{destinos.map((destino) => <DestinoCard key={destino.id} destino={destino}/>)}</div>}
    </section>
  </>
}
