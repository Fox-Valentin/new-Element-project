<template>
  <div class="app-body" v-loading="loading">
    <router-view :to="{name: 'layout'}"></router-view>
  </div>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      loading: null
    }
  },
  created () {
    this.loading = false    
    /*if (this.$store.getters.getLoginState === false) {
        this.$router.replace('/login')
        this.loading = false
    }
    window.location.href = "http://192.168.1.75/api/redirect"*/
    if(!localStorage.getItem("currentUser_token")){
       location.href = "http://192.168.1.75/api/redirect"
    }
  }
}
</script>

<style>
body {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
  .app-body {
    position: relative;
    left: 0;
    top: 0;
    height: 100%;
  }
</style>
