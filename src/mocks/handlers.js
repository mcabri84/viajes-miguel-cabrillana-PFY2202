import { http, HttpResponse, graphql, delay } from 'msw'
import { destinos, opcionesPorDestino } from './data.js'

const travelApi = graphql.link(/\/graphql$/)

export const handlers = [
  http.get(/\/api\/destinos$/, async () => {
    await delay(350)
    return HttpResponse.json(destinos)
  }),
  travelApi.query('OpcionesDestino', async ({ variables }) => {
    await delay(450)
    const opciones = opcionesPorDestino[variables.destinoId]
    if (!opciones) {
      return HttpResponse.json({
        errors: [{ message: 'No encontramos el destino solicitado.' }],
      })
    }
    return HttpResponse.json({ data: opciones })
  }),
]
