import Vue from 'vue'
import Router from 'vue-router'
import indexPage from '@/pages/indexPage'
import otherPage from '@/pages/otherPage'
import editUserRightsPage from '@/pages/editUserRightsPage'
import editOriginRights from '@/pages/editOriginRights'
import welcomePage from '@/pages/welcomePage'
import login from '@/pages/login'
import layout from '@/layout/layout'
Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/index',
      component: layout,
      name: 'layout',
      children: [
        {
          path: 'index',
          component: indexPage
        },
        {
          path: '',
          component: welcomePage
        },
        {
          path: 'other',
          component: otherPage
        },
        {
          path: 'editUserRightsPage',
          component: editUserRightsPage
        },
        {
          path: 'editOriginRights',
          component: editOriginRights
        }        
      ]
    },
    {
      path: '/login',
      component: login,
      name: 'login'
    }
  ]
})