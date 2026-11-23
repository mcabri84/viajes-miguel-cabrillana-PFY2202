export const destinos = [
  {
    id: 'san-pedro', nombre: 'San Pedro de Atacama', pais: 'Chile',
    descripcion: 'Desierto, lagunas altiplánicas y cielos para observar las estrellas.',
    actividades: ['Valle de la Luna', 'Géiseres del Tatio', 'Astroturismo'],
  },
  {
    id: 'buenos-aires', nombre: 'Buenos Aires', pais: 'Argentina',
    descripcion: 'Barrios históricos, gastronomía y cultura junto al Río de la Plata.',
    actividades: ['Caminito', 'Teatro Colón', 'Tango en San Telmo'],
  },
  {
    id: 'lima', nombre: 'Lima', pais: 'Perú',
    descripcion: 'Sabores del Pacífico, arquitectura colonial y paseos junto al mar.',
    actividades: ['Miraflores', 'Barranco', 'Centro histórico'],
  },
  {
    id: 'puerto-varas', nombre: 'Puerto Varas', pais: 'Chile',
    descripcion: 'Lagos y volcanes del sur. Sin opciones disponibles para estas fechas.',
    actividades: ['Lago Llanquihue', 'Saltos del Petrohué', 'Volcán Osorno'],
  },
]

export const opcionesPorDestino = {
  'san-pedro': {
    vuelos: [
      { id: 'v1', aerolinea: 'Andes Air', origen: 'Santiago (SCL)', llegada: 'Calama (CJC)', fechaSalida: '2027-01-15', fechaRegreso: '2027-01-20', precio: 129990, disponibilidad: 12 },
      { id: 'v2', aerolinea: 'Pacífico Air', origen: 'Santiago (SCL)', llegada: 'Calama (CJC)', fechaSalida: '2027-01-18', fechaRegreso: '2027-01-23', precio: 149990, disponibilidad: 0 },
    ],
    hoteles: [
      { id: 'h1', nombre: 'Refugio del Desierto', estrellas: 3, fechaEntrada: '2027-01-15', fechaSalida: '2027-01-20', precioPorNoche: 65990, disponibilidad: 5 },
      { id: 'h2', nombre: 'Cielo de Atacama', estrellas: 4, fechaEntrada: '2027-01-15', fechaSalida: '2027-01-20', precioPorNoche: 94990, disponibilidad: 3 },
    ],
  },
  'buenos-aires': {
    vuelos: [
      { id: 'v3', aerolinea: 'Andes Air', origen: 'Santiago (SCL)', llegada: 'Buenos Aires (EZE)', fechaSalida: '2027-02-05', fechaRegreso: '2027-02-10', precio: 189990, disponibilidad: 8 },
    ],
    hoteles: [
      { id: 'h3', nombre: 'Hotel del Río', estrellas: 4, fechaEntrada: '2027-02-05', fechaSalida: '2027-02-10', precioPorNoche: 79990, disponibilidad: 7 },
      { id: 'h4', nombre: 'Posada San Telmo', estrellas: 3, fechaEntrada: '2027-02-05', fechaSalida: '2027-02-10', precioPorNoche: 49990, disponibilidad: 0 },
    ],
  },
  lima: {
    vuelos: [
      { id: 'v4', aerolinea: 'Pacífico Air', origen: 'Santiago (SCL)', llegada: 'Lima (LIM)', fechaSalida: '2027-02-12', fechaRegreso: '2027-02-17', precio: 219990, disponibilidad: 6 },
    ],
    hoteles: [
      { id: 'h5', nombre: 'Mirador de Miraflores', estrellas: 4, fechaEntrada: '2027-02-12', fechaSalida: '2027-02-17', precioPorNoche: 84990, disponibilidad: 4 },
    ],
  },
  'puerto-varas': { vuelos: [], hoteles: [] },
}
