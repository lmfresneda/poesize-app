import config from '@config'
import utils from '@utils'

async function byText (text) {
  // api.get('/category/text/:text', auth, categoryCtrl.byText)

}
async function bySlug (slug) {
  // api.get('/category/slug/:slug', auth, categoryCtrl.bySlug)

}
async function getTrends (limit = 0) {
  // api.get('/category/trends', categoryCtrl.getTrends)
  const url = `${config.url_base}/category/trends?limit=${limit > 0 ? limit : 10}`
  console.log(url)

  const headers = utils.getBasicHeader()
  try {
    const { categories } = await fetch(url,
      { method: 'GET', headers })
      .then(res => res.json())
      .then(json => utils.extractData(json))
    return categories.map(c => c.category)
  } catch (err) {
    utils.catchError(err)
  }
}
async function propose (category) {
  // api.post('/category/propose/:category', auth, categoryCtrl.propose)

}

export default {
  byText,
  bySlug,
  propose,
  getTrends
}
