export default [
  {
    path: '/profile/',
    component: require('./pages/profile.vue')
  },
  {
    path: '/language/',
    component: require('./pages/language.vue')
  },
  {
    path: '/feedback/',
    component: require('./pages/feedback.vue')
  },
  {
    path: '/about/',
    component: require('./pages/about.vue')
  },
  {
    path: '/message/',
    component: require('./pages/message.vue')
  },
  {
    path: '/articles/:id',
    component: require('./pages/post.vue')
  },
]