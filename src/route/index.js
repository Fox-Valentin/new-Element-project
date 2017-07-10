import Vue from 'vue'
import Router from 'vue-router'
import indexPage from '@/pages/indexPage'
import otherPage from '@/pages/otherPage'
import login from '@/pages/login'
import layout from '@/layout/layout'
import welcomePage from '@/pages/welcomePage'

import roleAdminPage from '@/pages/role/roleAdminPage'
import roleAddAdminPage from '@/pages/role/roleAddAdminPage'

import userAdminPage from '@/pages/user/userAdminPage'
import userAddPage from '@/pages/user/userAddPage'

import clientAdminPage from '@/pages/client/clientAdminPage'
import clientAddPage from '@/pages/client/clientAddPage'

import permissionAdmin from '@/pages/permission/permissionAdmin'
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
          path: 'permissionAdmin',
          component: permissionAdmin
        },
        {
          path: 'roleAdminPage',
          component: roleAdminPage
        },
        {
          path: 'roleAddAdminPage',
          component: roleAddAdminPage
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