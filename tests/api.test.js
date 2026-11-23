import { after, test } from 'node:test'
import assert from 'node:assert/strict'
import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { handlers } from '../src/mocks/handlers.js'
import { OPCIONES_DESTINO } from '../src/services/queries.js'

const server = setupServer(...handlers)
server.listen({ onUnhandledRequest: 'error' })
const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost/graphql' }),
  cache: new InMemoryCache(),
})
after(() => { client.stop(); server.close() })

test('REST entrega destinos con país y actividades', async () => {
  const response = await fetch('http://localhost/api/destinos')
  assert.equal(response.status, 200)
  const destinos = await response.json()
  assert.equal(destinos.length, 4)
  assert.ok(destinos.every((d) => d.id && d.nombre && d.pais && d.actividades.length))
})

test('Apollo consulta vuelos y hoteles del destino seleccionado', async () => {
  for (const destinoId of ['san-pedro', 'buenos-aires', 'lima']) {
    const { data } = await client.query({ query: OPCIONES_DESTINO, variables: { destinoId } })
    assert.ok(data.vuelos.length > 0)
    assert.ok(data.hoteles.length > 0)
    assert.ok(data.vuelos.every((v) => v.precio > 0 && v.fechaSalida && Number.isInteger(v.disponibilidad)))
    assert.ok(data.hoteles.every((h) => h.precioPorNoche > 0 && h.fechaEntrada && Number.isInteger(h.disponibilidad)))
  }
})

test('Un destino sin disponibilidad devuelve listas vacías', async () => {
  const { data } = await client.query({ query: OPCIONES_DESTINO, variables: { destinoId: 'puerto-varas' } })
  assert.deepEqual(data, { vuelos: [], hoteles: [] })
})

test('Un destino inexistente produce un error GraphQL comprensible', async () => {
  await assert.rejects(
    client.query({ query: OPCIONES_DESTINO, variables: { destinoId: 'inexistente' } }),
    /No encontramos el destino/,
  )
})

test('El mock permite simular un error HTTP del servicio REST', async () => {
  server.use(http.get(/\/api\/destinos$/, () => HttpResponse.json({ message: 'Servicio no disponible' }, { status: 500 })))
  try {
    const response = await fetch('http://localhost/api/destinos')
    assert.equal(response.ok, false)
    assert.equal(response.status, 500)
  } finally {
    server.resetHandlers()
  }
})
