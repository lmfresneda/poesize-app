// import fetch from 'node-fetch'
// import config from '../../config'

async function getMyPoeline () {
  // api.get('/poe/timeline', auth, poeCtrl.getMyPoeline)

}
async function getPoelineUser (user) {
  // api.get('/poe/timeline/:user', auth, poeCtrl.getPoelineUser)

}
async function getByID (poeId) {
  // api.get('/poe/:poeId', auth, poeCtrl.getByID)

}
async function like (poeId) {
  // api.post('/poe/like/:poeId', auth, poeCtrl.like)

}
async function unlike (poeId) {
  // api.post('/poe/unlike/:poeId', auth, poeCtrl.unlike)

}
async function deletePoe (poeId) {
  // api.delete('/poe/:poeId', auth, poeCtrl.deletePoe)

}
async function savePoe (poe) {
  // api.post('/poe', auth, poeCtrl.savePoe)

}
async function getLiteByText (text) {
  // api.get('/poe/text/:text', auth, poeCtrl.getLiteByText)

}
async function getPoesByTag (tag) {
  // api.get('/poe/tag/:tag', auth, poeCtrl.getPoesByTag)

}
async function categorize (poeId, categoryId) {
  // api.post('/poe/categorize/:poeId/:categoryId', auth, poeCtrl.categorize)

}
async function uncategorize (poeId) {
  // api.post('/poe/uncategorize/:poeId', auth, poeCtrl.uncategorize)

}
async function getCategories (poeId) {
  // api.get('/poe/categories/:poeId', auth, poeCtrl.getCategories)

}

export default {
  getMyPoeline,
  getPoelineUser,
  getByID,
  like,
  unlike,
  deletePoe,
  savePoe,
  getLiteByText,
  getPoesByTag,
  categorize,
  uncategorize,
  getCategories
}
