import Vue from 'vue'
import Vuex from 'vuex'

import register from './register'
import landing from './landing'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    register,
    landing
  }
})

export default store
