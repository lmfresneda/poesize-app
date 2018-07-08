import api from '@api'
import utils from '@utils'
import config from '@config'
import { LocalStorage } from 'quasar'

export default ({ Vue }) => {
  Vue.prototype.$api = api
  Vue.prototype.$utils = utils
  Vue.prototype.$config = config

  if (process.env.NODE_ENV !== 'production') {
    LocalStorage.clear()
    window.console = window.console || {}
    window.console.log = utils.logdebug
    window.console.error = utils.logdebug
    window.console.warn = utils.logdebug
  }
}
