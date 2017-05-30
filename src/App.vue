<template>
  <div class="app-body">
    <v-layout></v-layout>
  </div>
</template>

<script>
import vLayout from '@/layout/layout'
export default {
  components: {
    vLayout
  },
  data () {
    return {}
  },
  methods: {
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
