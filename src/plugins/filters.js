import { date } from 'quasar'
import utils from '@utils'

export default ({ app, router, Vue }) => {
  Vue.filter('formatTsToHumanDate', (ts) => {
    if (ts.toString().length === 10) ts = parseInt(ts) * 1000
    return date.formatDate(ts, 'DD-MM-YYYY HH:mm:ss')
  })

  Vue.filter('humanizeNumber', (num) => {
    return utils.compactInteger(num, 1)
  })
}
