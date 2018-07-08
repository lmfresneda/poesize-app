import config from '@config'
import utils from '@utils'

async function getColors () {
  // api.get('/color', colorCtrl.getColors)
  const url = `${config.url_base}/color`
  console.log(url)

  const headers = utils.getBasicHeader()
  try {
    const { colors } = await fetch(url,
      { method: 'GET', headers })
      .then(res => res.json())
      .then(json => utils.extractData(json))
    return colors
  } catch (err) {
    utils.catchError(err)
  }
}

export default {
  getColors
}
