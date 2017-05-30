<template>
  <el-col :span="20">
    <v-nav-horizon></v-nav-horizon>
    <el-col :span="24" class="content-wrapper">
          <router-view></router-view>
    </el-col>
  </el-col>
</template>
<script>
import vNavHorizon from '@/layout/navHorizon'
export default {
  components: {
    vNavHorizon
  }
}
</script>
<style scoped>
  .content-wrapper {
        padding: 24px;
  }
</style>
