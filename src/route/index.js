import Vue from 'vue'
import Router from 'vue-router'
import indexPage from '@/pages/indexPage'
import otherPage from '@/pages/otherPage'
Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: indexPage
    },
    {
      path: '/other',
      component: otherPage
    }
  ]
})