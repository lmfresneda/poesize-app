import config from '@config'

export const isTooOld = (state) => {
  // demasiado antiguo es que llevo más de [config.lastSyncIsOld] milisegundos sin sincronizar
  return !state.poes.length ||
    !state.lastSync ||
    Date.now() > (state.lastSync + config.lastSyncIsOld)
}
