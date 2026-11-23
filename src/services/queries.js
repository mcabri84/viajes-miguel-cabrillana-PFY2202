import { gql } from '@apollo/client'

export const OPCIONES_DESTINO = gql`
  query OpcionesDestino($destinoId: ID!) {
    vuelos(destinoId: $destinoId) {
      id aerolinea origen llegada fechaSalida fechaRegreso precio disponibilidad
    }
    hoteles(destinoId: $destinoId) {
      id nombre estrellas fechaEntrada fechaSalida precioPorNoche disponibilidad
    }
  }
`
