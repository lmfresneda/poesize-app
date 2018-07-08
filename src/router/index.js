import Vue from 'vue'
import VueRouter from 'vue-router'
import utils from '@utils'
import routes from './routes'

Vue.use(VueRouter)

const Router = new VueRouter({
  /*
   * NOTE! Change Vue Router mode from quasar.conf.js -> build -> vueRouterMode
   *
   * If you decide to go with "history" mode, please also set "build.publicPath"
   * to something other than an empty string.
   * Example: '/' instead of ''
   */

  // Leave as is and change from quasar.conf.js instead!
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.VUE_ROUTER_BASE,
  scrollBehavior: () => ({ y: 0 }),
  routes
})

Router.beforeEach(async function(to, from, next) {
  // si va a login o rememberpass, le dejamos directamente salvo si viene de Timeline
  if (['login', 'rememberpass'].includes(to.name) && from.name !== 'timeline') return next()

  // si viene de login y no va a registro, a recordar contraseña o al timeline, no le dejamos
  if (from.name === 'login' && !['register', 'rememberpass', 'timeline'].includes(to.name)) {
    return next(false)
  }
  // si va al registro solo puede venir del login o del mismo registro
  if (to.name === 'register' && !['register', 'login'].includes(from.name)) {
    return next(false)
  }
  // si va al registro y viene del login pero no a la primera página, no le dejamos
  if (to.name === 'register' && from.name === 'login' && to.params.level !== 1) {
    return next(false)
  }
  // si va a la landing solo puede venir del registro o de la misma landing
  if (to.name === 'landing' && !['register', 'landing'].includes(from.name)) {
    return next(false)
  }
  // no se puede volver a la landing 1 desde la landing 2
  if (to.name === 'landing' && from.name === 'landing' && from.params.level === 2) {
    return next(false)
  }
  // si después de todo, va al registro, le dejamos ir
  if (to.name === 'register') {
    return next()
  }

  // si no, comprobar que el usuario tiene token válido, y si no, al login
  const isActive = await utils.userIsActive()
  if (isActive) {
    if (to.name === 'default') return next({ name: 'timeline' })
    next()
  } else {
    next({ name: 'login' })
  }
})

export default Router
