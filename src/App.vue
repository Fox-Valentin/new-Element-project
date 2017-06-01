<template>
  <div class="app-body" v-loading="loading">
    <v-layout  v-if="isLogin"></v-layout>
    <v-login v-else></v-login>
  </div>
</template>

<script>
import vLayout from '@/layout/layout'
import vLogin from '@/pages/login'
export default {
  components: {
    vLayout,
    vLogin
  },
  data () {
    return {
      islogin: false,
      loading: true
    }
  },
  computed: {
    isLogin () {
      return this.islogin
    }
  },
  methods: {
  },
  mounted () {
    this.$http.post('/api/isLogin', {id: 123}).then((res) => {
      this.loading = false
      this.islogin = res.data.status
    }, 
    (err) => {
      this.loading = false
      console.log(err)
    })
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
