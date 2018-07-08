import Vue from 'vue'

export const setDataLanding = (state, { field, value }) => {
  Vue.set(state, field, value)
}

export const setCache = (state, is) => {
  state.cache = is
}
