<template>
  <div class="layout-wrapper">
    <v-header></v-header>
    <el-row class="tac nav-wrapper">
      <v-nav-aside-menu></v-nav-aside-menu>
      <v-content></v-content>
    </el-row>
    <v-footer></v-footer>
  </div>
</template>
<script>
import vFooter from '@/layout/footer'
import vHeader from '@/layout/header'
import vNavAsideMenu from '@/layout/navAsideMenu'
import vContent from '@/layout/content'
export default {
  components: {
    vFooter,
    vHeader,
    vContent,
    vNavAsideMenu
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
