import Vue from 'vue'
import Router from 'vue-router'
import indexPage from '@/pages/indexPage'
import otherPage from '@/pages/otherPage'
import editUserRightsPage from '@/pages/editRoleRightsPage'
import editOriginRights from '@/pages/editOriginRights'
import adminRightsUserPage from '@/pages/adminRolePage'
import addAdminUserPage from '@/pages/addAdminRolePage'
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
          component: editUserRightsPage
        },
        {
          path: 'editOriginRights',
          component: editOriginRights
        },
        {
          path: 'adminRolePage',
          component: adminRightsUserPage
        },
        {
          path: 'addAdminRolePage',
          component: addAdminUserPage
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