import Vue from 'vue'
import Router from 'vue-router'
import indexPage from '@/pages/indexPage'
import otherPage from '@/pages/otherPage'
import login from '@/pages/login'
import layout from '@/layout/layout'
import welcomePage from '@/pages/welcomePage'

import adminRolePage from '@/pages/role/adminRolePage'
import addAdminRolePage from '@/pages/role/addAdminRolePage'

import userAdminPage from '@/pages/user/userAdminPage'
import userAddPage from '@/pages/user/userAddPage'

import clientAdminPage from '@/pages/client/clientAdminPage'
import clientAddPage from '@/pages/client/clientAddPage'

import editOriginRights from '@/pages/permission/editOriginRights'
import editRoleRightsPage from '@/pages/permission/editRoleRightsPage'


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
        },
        {
          path: 'userAdminPage',
          component: userAdminPage
        },
        {
          path: 'userAddPage',
          component: userAddPage
        },
        {
          path: 'clientAdminPage',
          component: clientAdminPage
        },
        {
          path: 'clientAddPage',
          component: clientAddPage
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