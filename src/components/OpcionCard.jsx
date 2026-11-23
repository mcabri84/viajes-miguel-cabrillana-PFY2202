const moneda = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 })
const fecha = (valor) => new Intl.DateTimeFormat('es-CL', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${valor}T12:00:00Z`))
export function OpcionCard({ opcion, tipo }) {
  const vuelo = tipo === 'vuelo'
  const disponible = opcion.disponibilidad > 0
  return <article className="option-card">
    <div className="option-heading"><h3>{vuelo ? opcion.aerolinea : opcion.nombre}</h3><span className={`availability ${disponible ? '' : 'sold-out'}`}>{disponible ? `${opcion.disponibilidad} ${vuelo ? 'asientos' : 'habitaciones'}` : 'Agotado'}</span></div>
    <p className="option-description">{vuelo ? `${opcion.origen} / ${opcion.llegada}` : `Hotel de ${opcion.estrellas} estrellas`}</p>
    <dl className="dates"><div><dt>{vuelo ? 'Salida' : 'Entrada'}</dt><dd>{fecha(vuelo ? opcion.fechaSalida : opcion.fechaEntrada)}</dd></div><div><dt>{vuelo ? 'Regreso' : 'Salida'}</dt><dd>{fecha(vuelo ? opcion.fechaRegreso : opcion.fechaSalida)}</dd></div></dl>
    <div className="price"><strong>{moneda.format(vuelo ? opcion.precio : opcion.precioPorNoche)}</strong><span>CLP · {vuelo ? 'ida y vuelta por persona' : 'por habitación / noche'}</span></div>
  </article>
}
