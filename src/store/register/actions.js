import api from '@api'

export const cache = async ({ commit }) => {
  const topics = await api.category.getTrends(10)
  commit('setDataRegister', { field: 'availableTopics', value: topics })
  commit('setCache', true)
}
