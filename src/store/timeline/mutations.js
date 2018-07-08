import Vue from 'vue'

function sortByDateDesc(poes) {
  return [...poes].sort((a, b) => b.date - a.date)
}

// traer el siguiente
export const next = (state) => {
  if (state.currentPoe) {
    const i = state.poes.findIndex(p => p._id === state.currentPoe._id)
    if (state.poes[i + 1]) {
      state.currentPoe = state.poes[i + 1]
    }
  }
}

// traer el anterior
export const previous = (state) => {
  if (state.currentPoe) {
    const i = state.poes.findIndex(p => p._id === state.currentPoe._id)
    if (i > 0 && state.poes[i - 1]) {
      state.currentPoe = state.poes[i - 1]
    }
  }
}

// añadir poe/s
export const add = (state, poes) => {
  const copyPoes =
    Object.prototype.toString.call(poes) === '[object Array]'
      ? sortByDateDesc(poes)
      : sortByDateDesc([poes])
  copyPoes.forEach((poe) => {
    if (!state.poes.find(p => p._id !== poe._id)) {
      state.poes.unshift(poe)
    }
  })
}

// resetear estado
export const reset = (state) => {
  state = {
    lastSync: null,
    page: 0,
    take: 10,
    currentPoe: null,
    poes: []
  }
}
