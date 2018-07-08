// Configuration for your app
const path = require('path')

module.exports = function (ctx) {
  return {
    // app plugins (/src/plugins)
    plugins: [
      'i18n',
      'filters',
      'init'
    ],
    css: [
      'app.scss'
    ],
    extras: [
      ctx.theme.mat ? 'roboto-font' : null,
      'material-icons'
      // 'ionicons',
      // 'mdi',
      // 'fontawesome'
    ],
    supportIE: false,
    vendor: {
      add: [],
      remove: []
    },
    build: {
      scopeHoisting: true,
      vueRouterMode: 'history',
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      // useNotifier: false,
      extendWebpack (cfg) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules|quasar)/
        })
        cfg.resolve.alias = {
          ...(cfg.resolve.alias || {}),
          '@components': path.resolve(__dirname, './src/components'),
          '@layouts': path.resolve(__dirname, './src/layouts'),
          '@pages': path.resolve(__dirname, './src/pages'),
          '@utils': path.resolve(__dirname, './src/utils'),
          '@store': path.resolve(__dirname, './src/store'),
          '@config': path.resolve(__dirname, './src/config'),
          '@errors': path.resolve(__dirname, './src/errors'),
          '@api': path.resolve(__dirname, './src/api')
        }
      }
    },
    devServer: {
      open: true // opens browser window automatically
    },
    framework: 'all', // --- includes everything; for dev only!
    // framework: {
    //   components: [
    //     'QLayout',
    //     'QLayoutHeader',
    //     'QLayoutDrawer',
    //     'QPageContainer',
    //     'QPage',
    //     'QToolbar',
    //     'QToolbarTitle',
    //     'QBtn',
    //     'QIcon',
    //     'QList',
    //     'QListHeader',
    //     'QItem',
    //     'QItemMain',
    //     'QItemSide',
    //     'QCheckbox',
    //    'QModal',
    //    'QSpinner',
    //    'QSpinnerAudio',
    //    'QInnerLoading'
    //   ],
    //   directives: [
    //     'Ripple',
    //     'CloseOverlay',
    //     'TouchSwipe',
    //     'TouchHold'
    //   ],
    //   // Quasar plugins
    //   plugins: [
    //     'Notify',
    //     'LocalStorage',
    //     'Loading',
    //     'Dialog',
    //   ]
    // },
    animations: 'all', // --- includes all animations
    // animations: [
    // ],
    cordova: {
      // id: 'org.cordova.quasar.app'
    },

    // leave this here for Quasar CLI
    starterKit: '1.0.0'
  }
}
