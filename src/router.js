import Vue from 'vue'
import Router from 'vue-router'
// import Dashboard from './views/Dashboard.vue'
import Login from '@/views/Login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/believers',
      name: 'believers',
      props: true,
      beforeEnter: (to, from, next) => {
        if (to.params.user) {
          next()
        } else {
          next({ name: 'login' })
        }
      },
      component: () =>
        import(/* webpackChunkName: "believers" */ './views/Believers.vue')
    },
    {
      path: '/churches',
      name: 'churches',
      props: true,
      beforeEnter: (to, from, next) => {
        if (to.params.user) {
          next()
        } else {
          next({ name: 'login' })
        }
      },
      component: () =>
        import(/* webpackChunkName: "churches" */ './views/Churches.vue')
    }
  ]
})
