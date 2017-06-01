import Vue from 'vue'
import Router from 'vue-router'
import indexPage from '@/pages/indexPage'
import otherPage from '@/pages/otherPage'
import editUserRightsPage from '@/pages/editUserRightsPage'
import editOriginRights from '@/pages/editOriginRights'
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
    },
    {
      path: '/editUserRightsPage',
      component: editUserRightsPage
    },
    {
      path: '/editOriginRights',
      component: editOriginRights
    }
  ]
})