<template>
  <div class="layout-wrapper">
    <v-header></v-header>
    <el-row class="tac nav-wrapper">
      <v-nav-aside-menu></v-nav-aside-menu>
      <v-content></v-content>
    </el-row>
  </div>
</template>
<script>
import Vue from "vue"
import vHeader from '@/layout/header'
import vNavAsideMenu from '@/layout/navAsideMenu'
import vContent from '@/layout/content'
export default {
  components: {
    vHeader,
    vContent,
    vNavAsideMenu
  },
  mounted (){
    if(location.hash.indexOf("access_token") !== -1){
      let urTokenKey = "access_token"
      let urlSliceIndex = location.hash.indexOf("access_token") + urTokenKey.length + 1
      let urlSliceEnd = location.hash.slice(urlSliceIndex).indexOf("&")
      let token =  location.hash.slice(urlSliceIndex).slice(0,urlSliceEnd)
      this.$store.commit("setUser",token)
    }
    Vue.http.interceptors.push(function(request, next) {
      var token = "Bearer " + this.$store.getters.getUserToken
      request.headers.set('Authorization', token)
      request.headers.set('Accept', "application/json")
      next()
    });
    this.$http.get("/api/login",() => {})
  },
  methods: {
    
  }
}
</script>
<style scoped>
  .nav-wrapper {
    padding-top: 60px;
    height: 100%;
  }
  .layout-wrapper {
    position: relative;
    height: 100%;
  }
</style>
