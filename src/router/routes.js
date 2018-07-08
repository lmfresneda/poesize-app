
export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      {
        path: '',
        name: 'default',
        component: () => import('pages/index')
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('pages/LoginPage')
      },
      {
        path: '/register/:level',
        name: 'register',
        component: () => import('pages/RegisterPage'),
        props: true
      },
      {
        path: '/rememberpass',
        name: 'rememberpass',
        component: () => import('pages/RememberPassPage')
      },
      {
        path: '/landing/:level',
        name: 'landing',
        component: () => import('pages/LandingPage'),
        props: true
      },
      {
        path: '/timeline',
        name: 'timeline',
        component: () => import('pages/TimelinePage')
      },
      {
        path: '/interactions',
        name: 'interactions',
        component: () => import('pages/InteractionsPage')
      },
      {
        path: '/profile/:user',
        name: 'profile',
        component: () => import('pages/ProfilePage')
      },
      {
        path: '/poedetail/:poeId',
        name: 'poedetail',
        component: () => import('pages/PoeDetailPage'),
        props: true
      },
      {
        path: '/new',
        name: 'new',
        component: () => import('pages/NewPoePage'),
        props: true
      },
      {
        path: '/search',
        name: 'search',
        component: () => import('pages/SearchPage')
      },
      {
        path: '/categorize',
        name: 'categorize',
        component: () => import('pages/CategorizePage')
      }
    ]
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
