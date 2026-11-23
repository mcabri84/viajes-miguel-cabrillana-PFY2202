export function Mensaje({ titulo, children, error = false }) {
  return <div className={`message ${error ? 'message-error' : ''}`} role={error ? 'alert' : 'status'}><h2>{titulo}</h2>{children}</div>
}
export function Cargando({ texto = 'Cargando destinos…' }) {
  return <div className="loading" role="status"><span className="spinner" aria-hidden="true" />{texto}</div>
}
