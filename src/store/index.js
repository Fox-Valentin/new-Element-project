import Vuex from 'vuex'
import Vue from 'vue'
import loginStatus from './modules/loginStatus'
import adminUserModule from './modules/adminUserModule'
import adminTokenModule from './modules/adminTokenModule'
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    loginStatus,
    adminUserModule,
    adminTokenModule
  }
})

