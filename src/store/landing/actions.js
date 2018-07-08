import api from '@api'

export const cache = async ({ commit, state }) => {
  if (state.cache) return

  const [trends, colors] = await Promise.all([
    api.profile.getTrends(10),
    api.color.getColors()
  ])
  commit('setDataLanding', { field: 'trends', value: trends })
  commit('setDataLanding', { field: 'colors', value: colors })
  commit('setCache', true)
}
