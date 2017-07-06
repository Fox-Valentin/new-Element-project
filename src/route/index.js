import Vue from 'vue'
import Router from 'vue-router'
import indexPage from '@/pages/indexPage'
import otherPage from '@/pages/otherPage'
import editRoleRightsPage from '@/pages/editRoleRightsPage'
import editOriginRights from '@/pages/editOriginRights'
import adminRolePage from '@/pages/adminRolePage'
import addAdminRolePage from '@/pages/addAdminRolePage'
import welcomePage from '@/pages/welcomePage'
import login from '@/pages/login'
import layout from '@/layout/layout'
Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: layout,
      name: 'layout',
      children: [
        {
          path: 'index',
          component: indexPage
        },
        {
          path: 'other',
          component: otherPage
        },
        {
          path: 'editRoleRightsPage',
          component: editRoleRightsPage
        },
        {
          path: 'editOriginRights',
          component: editOriginRights
        },
        {
          path: 'adminRolePage',
          component: adminRolePage
        },
        {
          path: 'addAdminRolePage',
          component: addAdminRolePage
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