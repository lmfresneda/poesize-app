import mentionHastags from 'mention-hashtag'
import linkifyIt from 'linkify-it'
import metascraper from 'metascraper'
import api from '@api'
import { LocalStorage, date } from 'quasar'
import {
  STORAGE_KEY_USER,
  STORAGE_KEY_TOKEN
} from './constants'

const linkify = linkifyIt()
linkify.add('ftp:', null)

const emailRegex = /(^$|^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/ // eslint-disable-line
const usernameRegex = /^([a-zA-Z0-9]_?){3,39}$/ // eslint-disable-line
const passwordRegex = /^[\dA-Za-z_!@#$%^&*\w]{8,50}$/ // eslint-disable-line

export async function getInfoLink(url) {
  const html = await fetch(url).then(res => res.text())
  const metadata = await metascraper({ html, url })
  return metadata
}

export function getMentionsAndTags(text) {
  return mentionHastags(text, { unique: true, type: 'all' })
}

export function getLinks(text) {
  return linkify.match(text)
}

export function getUser() {
  return LocalStorage.get.item(STORAGE_KEY_USER)
}

export function getTokenSession() {
  return LocalStorage.get.item(STORAGE_KEY_TOKEN)
}

export function setUser(user) {
  return LocalStorage.set(STORAGE_KEY_USER, user)
}

export function setTokenSession(token) {
  return LocalStorage.set(STORAGE_KEY_TOKEN, token)
}

export async function userIsActive() {
  if (LocalStorage.isEmpty()) return false

  if (!LocalStorage.has(STORAGE_KEY_USER) ||
    !LocalStorage.has(STORAGE_KEY_TOKEN)) return false

  const res = await api.user.isActive(
    getUser(), getTokenSession(STORAGE_KEY_TOKEN))

  // TODO comprobar como viene "res" y responder

  return res
}

export function clearSession() {
  LocalStorage.clear()
}

export function getBasicHeader(token = null) {
  const headers = new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/json'
  })
  if (token) {
    headers.append('Authorization', `Bearer ${token}`)
  }
  return headers
}

export function extractData(res) {
  return res && res.data
    ? res.data
    : res
}

export function catchError(err) {
  // TODO con error
}

export const validation = {
  email(email) {
    return email && email.length && emailRegex.test(email)
  },
  username(user) {
    return usernameRegex.test(user)
  },
  password(pass) {
    return passwordRegex.test(pass)
  }
}

// extract from https://www.npmjs.com/package/humanize-plus
export function compactInteger(input, decimals = 0) {
  decimals = Math.max(decimals, 0)
  const number = parseInt(input, 10)
  const signString = number < 0 ? '-' : ''
  const unsignedNumber = Math.abs(number)
  const unsignedNumberString = String(unsignedNumber)
  const numberLength = unsignedNumberString.length
  const numberLengths = [13, 10, 7, 4]
  const bigNumPrefixes = ['T', 'B', 'M', 'k']

  // small numbers
  if (unsignedNumber < 1000) {
    return `${signString}${unsignedNumberString}`
  }

  // really big numbers
  if (numberLength > numberLengths[0] + 3) {
    return number.toExponential(decimals).replace('e+', 'x10^')
  }

  // 999 < unsignedNumber < 999,999,999,999,999
  let length
  for (let i = 0; i < numberLengths.length; i += 1) {
    const _length = numberLengths[i]
    if (numberLength >= _length) {
      length = _length
      break
    }
  }

  const decimalIndex = numberLength - length + 1
  const unsignedNumberCharacterArray = unsignedNumberString.split('')

  const wholePartArray = unsignedNumberCharacterArray.slice(0, decimalIndex)
  const decimalPartArray = unsignedNumberCharacterArray.slice(decimalIndex, decimalIndex + decimals + 1)

  const wholePart = wholePartArray.join('')

  // pad decimalPart if necessary
  let decimalPart = decimalPartArray.join('')
  if (decimalPart.length < decimals) {
    decimalPart += `${Array(decimals - decimalPart.length + 1).join('0')}`
  }

  let output
  if (decimals === 0) {
    output = `${signString}${wholePart}${bigNumPrefixes[numberLengths.indexOf(length)]}`
  } else {
    const outputNumber = Number(`${wholePart}.${decimalPart}`).toFixed(decimals)
    output = `${signString}${outputNumber}${bigNumPrefixes[numberLengths.indexOf(length)]}`
  }

  return output
}

export function openCamera(options = {}) {
  return new Promise((resolve, reject) => {
    const optDefaults = {
      destinationType: Camera.DestinationType.DATA_URL,
      allowEdit: false,
      sourceType: Camera.PictureSourceType.CAMERA,
      cameraDirection: Camera.Direction.BACK,
      saveToPhotoAlbum: process.env.NODE_ENV === 'production',
      quality: 30
    }
    navigator.camera.getPicture(resolve, reject,
      Object.assign(optDefaults, options)
    )
  })
}

// for circular json
export function censor(censor) {
  var i = 0
  return function (key, value) {
    // eslint-disable-next-line
    if (i !== 0 && typeof (censor) === 'object' && typeof (value) == 'object' && censor == value) {
      return '[Circular]'
    }
    if (i >= 29) return '[Unknown]'
    i += 1
    return value
  }
}

let countLogger = 0
// log in <head> tag by <meta> tags, because the normal console.log doesn't work in cordova
export function logdebug() {
  if (process.env.NODE_ENV !== 'production') {
    if (arguments && arguments[0] && arguments[0].indexOf('[flush] serialized') !== -1) {
      return
    }
    countLogger += 1
    const node = document.createElement('meta')
    node.name = `logger_${countLogger}`
    const ds = date.formatDate(Date.now(), 'HH:mm:ss.SSS')
    node.content = `[${ds}] DEBUG - ${JSON.stringify(arguments, censor(arguments))}`
    document.head.insertBefore(node, document.head.firstChild)
  }
}
