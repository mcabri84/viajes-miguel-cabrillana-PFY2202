import { useQuery } from '@apollo/client/react'
import { Link, useParams } from 'react-router-dom'
import { OPCIONES_DESTINO } from '../services/queries.js'
import { Cargando, Mensaje } from '../components/Mensaje.jsx'
import { Paisaje } from '../components/DestinoCard.jsx'
import { OpcionCard } from '../components/OpcionCard.jsx'
export function DetalleDestino({ destinos, cargando, error, reintentar }) {
  const { destinoId } = useParams()
  const destino = destinos.find((item) => item.id === destinoId)
  const { data, loading, error: errorOpciones, refetch } = useQuery(OPCIONES_DESTINO, { variables: { destinoId }, skip: !destino, notifyOnNetworkStatusChange: true })
  return <div className="container detail-page"><Link className="back-link" to="/">Volver a destinos</Link>
    {cargando ? <Cargando/> : error ? <Mensaje error titulo="No pudimos cargar el destino"><p>{error}</p><button className="button" onClick={reintentar}>Reintentar</button></Mensaje> : !destino ? <Mensaje titulo="Destino no encontrado"><p>Selecciona uno de los destinos disponibles.</p><Link className="button" to="/">Explorar destinos</Link></Mensaje> : <>
      <section className="destination-intro"><div><p className="eyebrow">DESCUBRE {destino.pais.toUpperCase()}</p><h1>{destino.nombre}</h1><p>{destino.descripcion}</p><ul className="tags" aria-label="Actividades populares">{destino.actividades.map((actividad) => <li key={actividad}>{actividad}</li>)}</ul></div><div className="detail-art"><Paisaje id={destino.id}/></div></section>
      <div className="detail-heading"><h2>Planifica tu próxima escapada</h2><p>Compara las opciones disponibles. Todos los precios están en pesos chilenos.</p></div>
      {loading ? <Cargando texto="Consultando vuelos y hoteles…"/> : errorOpciones ? <Mensaje error titulo="No pudimos consultar las opciones"><p>Ocurrió un problema al obtener los vuelos y hoteles. Intenta nuevamente o explora otro destino.</p><button className="button" onClick={() => { refetch().catch(() => {}) }}>Reintentar</button></Mensaje> : <div className="options-grid">
        <section aria-labelledby="vuelos-titulo"><div className="options-title"><h2 id="vuelos-titulo">Vuelos</h2><span>{data?.vuelos.length ?? 0} opciones</span></div>{data?.vuelos.length ? data.vuelos.map((vuelo) => <OpcionCard key={vuelo.id} opcion={vuelo} tipo="vuelo"/>) : <Mensaje titulo="Sin vuelos disponibles"><p>No hay vuelos para este destino en las fechas de la demostración.</p></Mensaje>}</section>
        <section aria-labelledby="hoteles-titulo"><div className="options-title"><h2 id="hoteles-titulo">Hoteles</h2><span>{data?.hoteles.length ?? 0} opciones</span></div>{data?.hoteles.length ? data.hoteles.map((hotel) => <OpcionCard key={hotel.id} opcion={hotel} tipo="hotel"/>) : <Mensaje titulo="Sin hoteles disponibles"><p>No hay alojamientos para este destino en las fechas de la demostración.</p></Mensaje>}</section>
      </div>}
    </>}
  </div>
}
