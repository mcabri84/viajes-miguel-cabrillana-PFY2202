# Rumbo

Aplicación académica de una agencia de viajes que permite explorar destinos y consultar vuelos y hoteles mediante APIs simuladas REST y GraphQL.

**Autor:** Miguel Cabrillana  
**Asignatura:** Desarrollo Frontend II — PFY2202  
**Actividad:** Sumativa 2 — Semana 5 — Integrando nuestro frontend con backend

## Funcionamiento

El catálogo obtiene cuatro destinos por REST, con nombre, país, descripción y actividades populares. Al seleccionar un destino, la aplicación consulta sus vuelos y hoteles mediante GraphQL y Apollo Client. Las opciones muestran precios en CLP, fechas y disponibilidad. Se distinguen las opciones agotadas y los destinos sin resultados.

La interfaz incluye indicadores de carga, mensajes de error con reintento, navegación con React Router y diseño adaptado a escritorio y móvil. Todos los datos son ficticios. No se realizan reservas, pagos ni consultas a proveedores reales.

## Tecnologías

React y JavaScript, CSS, React Router, Apollo Client, GraphQL, MSW 2 y Vite. Las versiones exactas resueltas están registradas en `package-lock.json`.

Se utiliza Vite para preparar y compilar React. MSW 2 corresponde a la versión principal utilizada en la guía. No se necesita un servidor backend separado ni una base de datos.

## Requisitos y ejecución

Entorno comprobado: Ubuntu Linux, Node.js 22.23.1 y npm 10.9.8.

Desde la carpeta del proyecto:

```bash
npm ci
npm run dev
```

Abrir la dirección que muestra Vite en la terminal; por defecto, `http://localhost:5173/`.

```bash
npm test
npm run build
npm run preview
```

`npm test` ejecuta pruebas de integración de las APIs mock. `npm run build` genera `dist/`. Para revisar esa compilación local con `npm run preview`, abrir la ruta `/viajes-miguel-cabrillana-PFY2202/` en el servidor indicado por Vite.

## APIs simuladas

| API | Operación | Datos |
| --- | --- | --- |
| REST | `GET <base>/api/destinos` | Destinos, país, descripción y actividades |
| GraphQL | `POST <base>/graphql`, consulta `OpcionesDestino` | Vuelos y hoteles del destino indicado por `destinoId` |

`<base>` es la ruta de la aplicación: vacía en desarrollo y `/viajes-miguel-cabrillana-PFY2202` en la compilación para Pages.

Identificadores de prueba: `san-pedro`, `buenos-aires`, `lima` y `puerto-varas`. Este último devuelve listas vacías para demostrar el estado sin disponibilidad. San Pedro incluye un vuelo agotado y Buenos Aires incluye un hotel agotado.

Los handlers de MSW interceptan las peticiones HTTP. El Service Worker se inicia antes de renderizar React. Se mantiene activo en la compilación publicada porque esta entrega demuestra servicios mock; no hay un backend productivo. El navegador debe permitir Service Workers y la aplicación debe servirse mediante localhost o HTTPS.

## Organización del código

```text
src/
  components/     Tarjetas de destinos y opciones, mensajes y carga
  pages/          Catálogo y detalle de destino
  mocks/          Datos ficticios, handlers REST/GraphQL y Service Worker
  services/       Petición REST, consulta GraphQL y cliente Apollo
  App.jsx         Estado de destinos y rutas
  main.jsx        Inicialización de MSW y React
public/
  mockServiceWorker.js
 tests/
  api.test.js     Pruebas de integración
 evidencias/      Capturas de Chrome y resultados de pruebas
.github/workflows/deploy.yml
```

El catálogo se carga con `useState` y `useEffect`, cancelando peticiones al desmontar el efecto. Apollo gestiona el estado y la caché de las consultas por destino. Se usa `HashRouter` para permitir recargar las rutas de detalle en alojamiento estático.

## Verificaciones

- Pruebas de integración: destinos REST, opciones GraphQL mediante Apollo, listas vacías, destino inexistente y error HTTP 500.
- Chrome: catálogo, selección de San Pedro, vuelos y hoteles con precios y fechas, disponibilidad y agotados, regreso al catálogo, Puerto Varas sin resultados y recarga de la ruta de detalle.
- Chrome a 390 píxeles: catálogo y detalle sin desbordamiento horizontal.
- Firefox: Miguel confirmó que abre correctamente y muestra los elementos esperados. Esta comprobación fue manual; no se dispone de captura ni versión registrada de Firefox.
- Compilación de producción: verificada localmente. La verificación del despliegue público está pendiente.

Las capturas disponibles están en `evidencias/`.

## Publicación

Repositorio previsto: `viajes-miguel-cabrillana-PFY2202`.

El workflow de GitHub Actions instala las dependencias, ejecuta las pruebas, compila y publica `dist/` en GitHub Pages al actualizar `main`. En Settings → Pages, la fuente debe ser GitHub Actions.

**Estado actual:** configuración preparada; repositorio y despliegue público pendientes. Los enlaces verificados se incorporarán después de publicar.
