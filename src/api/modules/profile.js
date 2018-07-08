import utils from '@utils'
import config from '@config'
import { NoSessionError } from '@errors'

async function getTrends (limit = 10) {
  const token = utils.getTokenSession()
  if (!token) throw new NoSessionError()

  // api.get('/profile/trends', auth, profileCtrl.getTrends)
  const url = `${config.url_base}/profile/trends`
  console.log(url)

  const headers = utils.getBasicHeader(token)
  try {
    const { users } = await fetch(url,
      { method: 'GET', headers })
      .then(res => res.json())
      .then(json => utils.extractData(json))
    return users
  } catch (err) {
    utils.catchError(err)
  }
}
async function follow (user) {
  const token = utils.getTokenSession()
  if (!token) throw new NoSessionError()

  // api.post('/profile/follow/:user', auth, profileCtrl.follow)
  const url = `${config.url_base}/profile/follow/${user}`
  console.log(url)

  const headers = utils.getBasicHeader(token)
  try {
    await fetch(url,
      { method: 'POST', headers })
      .then(res => res.json())
  } catch (err) {
    utils.catchError(err)
  }
}
async function unfollow (user) {
  const token = utils.getTokenSession()
  if (!token) throw new NoSessionError()

  // api.post('/profile/unfollow/:user', auth, profileCtrl.unfollow)
  const url = `${config.url_base}/profile/unfollow/${user}`
  console.log(url)

  const headers = utils.getBasicHeader(token)
  try {
    await fetch(url,
      { method: 'POST', headers })
      .then(res => res.json())
  } catch (err) {
    utils.catchError(err)
  }
}
async function updateConfiguration (configuration) {
  // api.put('/profile/configuration', auth, profileCtrl.updateConfiguration)

}
async function updateProfile (profile) {
  // api.put('/profile', auth, profileCtrl.updateProfile)
  const token = utils.getTokenSession()
  if (!token) throw new NoSessionError()

  const url = `${config.url_base}/profile`
  console.log(url)

  const headers = utils.getBasicHeader(token)
  try {
    await fetch(url,
      {
        method: 'PUT',
        headers,
        body: JSON.stringify(profile)
      })
      .then(res => res.json())
  } catch (err) {
    utils.catchError(err)
  }
}
async function silence (user) {
  const token = utils.getTokenSession()
  if (!token) throw new NoSessionError()

  // api.post('/profile/silence/:user', auth, profileCtrl.silence)
  const url = `${config.url_base}/profile/silence/${user}`
  console.log(url)

  const headers = utils.getBasicHeader(token)
  try {
    await fetch(url,
      { method: 'POST', headers })
      .then(res => res.json())
  } catch (err) {
    utils.catchError(err)
  }
}
async function unsilence (user) {
  const token = utils.getTokenSession()
  if (!token) throw new NoSessionError()

  // api.post('/profile/unsilence/:user', auth, profileCtrl.unsilence)
  const url = `${config.url_base}/profile/unsilence/${user}`
  console.log(url)

  const headers = utils.getBasicHeader(token)
  try {
    await fetch(url,
      { method: 'POST', headers })
      .then(res => res.json())
  } catch (err) {
    utils.catchError(err)
  }
}
async function fav (user) {
  const token = utils.getTokenSession()
  if (!token) throw new NoSessionError()

  // api.post('/profile/fav/:user', auth, profileCtrl.fav)
  const url = `${config.url_base}/profile/fav/${user}`
  console.log(url)

  const headers = utils.getBasicHeader(token)
  try {
    await fetch(url,
      { method: 'POST', headers })
      .then(res => res.json())
  } catch (err) {
    utils.catchError(err)
  }
}
async function unfav (user) {
  const token = utils.getTokenSession()
  if (!token) throw new NoSessionError()

  // api.post('/profile/unfav/:user', auth, profileCtrl.unfav)
  const url = `${config.url_base}/profile/unfav/${user}`
  console.log(url)

  const headers = utils.getBasicHeader(token)
  try {
    await fetch(url,
      { method: 'POST', headers })
      .then(res => res.json())
  } catch (err) {
    utils.catchError(err)
  }
}
async function getByName (name) {
  // api.get('/profile/name/:name', auth, profileCtrl.getByName)

}
async function getByUser (login) {
  // api.get('/profile/:login', auth, profileCtrl.getByUser)

}
async function getFollowingByUser (user) {
  // api.get('/profile/following/:user', auth, profileCtrl.getFollowingByUser)

}
async function getFollowersByUser (user) {
  // api.get('/profile/followers/:user', auth, profileCtrl.getFollowersByUser)

}

export default {
  getTrends,
  follow,
  unfollow,
  updateConfiguration,
  updateProfile,
  silence,
  unsilence,
  fav,
  unfav,
  getByName,
  getByUser,
  getFollowingByUser,
  getFollowersByUser
}
