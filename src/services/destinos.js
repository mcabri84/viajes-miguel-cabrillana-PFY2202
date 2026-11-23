export async function obtenerDestinos(signal) {
  const response = await fetch(`${import.meta.env.BASE_URL}api/destinos`, { signal })
  if (!response.ok) {
    throw new Error('No pudimos cargar los destinos. Intenta nuevamente.')
  }
  return response.json()
}
