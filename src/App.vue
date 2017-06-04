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
      if (res.data.status === false) {
        this.$router.replace('/login')
      }
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
