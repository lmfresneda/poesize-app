export default {
  url_base: process.env.NODE_ENV === 'production'
    ? 'http://localhost:3001/api'
    : 'http://XXX.XXX.XXX.XXX:3001/api', // your local ip address
  minDistanceSwipeGlobal: 140,
  minYearsOld: 14,
  lastSyncIsOld: (1000 * 60 * 60 * 2) // 2 horas en milisegundos
}
