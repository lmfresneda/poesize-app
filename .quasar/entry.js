/**
 * THIS FILE IS GENERATED AUTOMATICALLY.
 * DO NOT EDIT.
 *
 * You are probably looking on adding initialization code.
 * Use "quasar new plugin <name>" and add it there.
 * One plugin per concern. Then reference the file(s) in quasar.conf.js > plugins:
 * plugins: ['file', ...] // do not add ".js" extension to it.
 **/
import './quasar'

import Vue from 'vue'
Vue.config.productionTip = false


import 'quasar-extras/roboto-font'

import 'quasar-extras/material-icons'



import 'quasar-extras/animate'


import 'quasar-app-styl'


import 'src/css/app.scss'


import App from 'src/App'

import router from 'src/router'

import store from 'src/store'


const app = {
  el: '#q-app',
  router,
store,
  ...App
}


const plugins = []

import pluginI18n from 'src/plugins/i18n'
plugins.push(pluginI18n)

import pluginFilters from 'src/plugins/filters'
plugins.push(pluginFilters)

import pluginInit from 'src/plugins/init'
plugins.push(pluginInit)

plugins.forEach(plugin => plugin({ app, router, store, Vue }))







  
document.addEventListener('deviceready', () => {
Vue.prototype.$q.cordova = window.cordova



new Vue(app)



}, false) // on deviceready

