// import fetch from 'node-fetch'
// import config from '../../config'

async function getByID (commentId) {
  // api.get('/comment/:commentId', auth, commentCtrl.getByID)

}
async function getByPoe (poeId) {
  // api.get('/comment/poe/:poeId', auth, commentCtrl.getByPoe)

}
async function saveComment (comment) {
  // api.post('/comment', auth, commentCtrl.saveComment)

}
async function deleteComment (commentId) {
  // api.delete('/comment/:commentId', auth, commentCtrl.deleteComment)

}

export default {
  getByID,
  getByPoe,
  saveComment,
  deleteComment
}
