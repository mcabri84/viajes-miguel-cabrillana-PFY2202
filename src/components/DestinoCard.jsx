import { Link } from 'react-router-dom'
// Ilustraciones propias sin dependencias de imágenes externas.
export function Paisaje({ id }) {
  const paletas = {
    'san-pedro': ['#f7c693', '#d58859', '#9b4e38', '#fce5b6'],
    'buenos-aires': ['#b5d7e3', '#6e9da5', '#335c68', '#f4e0ac'],
    lima: ['#b5d9db', '#6aa5a7', '#376879', '#fff0b2'],
    'puerto-varas': ['#c6dce7', '#63978a', '#315d55', '#ffefd0'],
  }
  const [cielo, fondo, frente, sol] = paletas[id] || paletas.lima
  const urbano = id === 'buenos-aires' || id === 'lima'
  return <svg className="landscape" viewBox="0 0 600 260" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
    <rect width="600" height="260" fill={cielo} /><circle cx="460" cy="65" r="34" fill={sol} />
    {urbano ? <>
      <path d="M0 190V100H55V155H95V85H145V130H180V65H220V140H270V90H330V160H365V115H420V170H470V105H530V155H600V260H0Z" fill={fondo}/>
      <path d="M0 225V175H80V135H135V195H200V150H265V210H330V140H390V195H455V155H520V200H600V260H0Z" fill={frente}/>
      <path d="M0 245Q150 215 300 245T600 240V260H0Z" fill={cielo}/>
    </> : <>
      <path d="M0 220L130 80L240 185L345 45L520 205L600 130V260H0Z" fill={fondo}/>
      {id === 'puerto-varas' && <path d="M290 110L345 45L408 122L365 101L344 117L325 98Z" fill="#f4f8fa"/>}
      <path d="M0 230Q110 130 240 210T600 180V260H0Z" fill={frente}/>
      <path d="M0 260Q180 185 380 250T600 230" fill="none" stroke={sol} strokeWidth="14" opacity=".55"/>
    </>}
  </svg>
}
export function DestinoCard({ destino }) {
  return <article className="destination-card"><div className="card-art"><Paisaje id={destino.id}/><span className="country-label">{destino.pais}</span></div>
    <div className="card-body"><h3>{destino.nombre}</h3><p>{destino.descripcion}</p><ul className="tags" aria-label="Actividades populares">{destino.actividades.map((actividad) => <li key={actividad}>{actividad}</li>)}</ul><Link className="button" to={`/destinos/${destino.id}`}>Ver vuelos y hoteles<span className="sr-only"> en {destino.nombre}</span></Link></div>
  </article>
}
