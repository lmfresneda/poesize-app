import config from '@config'
import utils from '@utils'
import { UserExistError, EmailExistError } from '@errors'

async function signIn (user, password) {
  // api.post('/auth/signin', userCtrl.signIn)
  const url = `${config.url_base}/auth/signin`

  const headers = utils.getBasicHeader()
  return fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      user,
      password
    })
  }).then(res => res.json())
    .then(json => utils.extractData(json))
    .catch(utils.catchError)
}
async function signUp (userToSave) {
  // api.post('/auth/signup', userCtrl.signUp)
  const url = `${config.url_base}/auth/signup`
  console.log('signUp enter', userToSave)
  console.log(url)

  const headers = utils.getBasicHeader()
  const response = await fetch(url,
    {
      method: 'POST',
      headers,
      body: JSON.stringify(userToSave)
    })
    .then(res => res.json())

  if (response.meta.status < 200 || response.meta.status > 299) {
    // ha ocurrido algo
    if (response.data.message.toLowerCase().includes('username')) {
      throw new UserExistError(userToSave.user)
    }
    if (response.data.message.toLowerCase().includes('email')) {
      throw new EmailExistError(userToSave.email)
    }
    throw new Error(response.data.message)
  }

  return utils.extractData(response)
}
async function recoveryPass (email) {
  // api.post('/auth/recoverypass', userCtrl.recoveryPass)
  const url = `${config.url_base}/auth/recoverypass`

  console.log(email)
  console.log(url)

  return // TODO

  const headers = utils.getBasicHeader()
  return fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      email
    })
  }).then(res => res.json())
    .then(json => utils.extractData(json))
    .catch(utils.catchError)
}
async function isActive (user, token) {
  // api.get('/auth/:user', userCtrl.isActive)
  const url = `${config.url_base}/auth/${user.user ? user.user : user}`
  console.log(url)

  // TODO
  // return utils.getUser() && utils.getTokenSession()

  const headers = utils.getBasicHeader(token)
  return fetch(url, {
    method: 'GET',
    headers
  }).then(res => res.json())
    .then(json => utils.extractData(json))
    .catch(utils.catchError)
}

export default {
  signIn,
  signUp,
  recoveryPass,
  isActive
}
