<template>
    <el-col :span="4" class="nav-aside-wrapper">
      <el-menu default-active="null" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
        <router-link :to="{path : '/roleAdminPage'}"><el-menu-item index="1"><i class="el-icon-star-on"></i>角色管理</el-menu-item></router-link>
        <router-link :to="{path: '/userAdminPage'}"><el-menu-item index="2"><i class="el-icon-star-off"></i>用户管理</el-menu-item></router-link>
        <router-link :to="{path: '/clientAdminPage'}"><el-menu-item index="5"><i class="el-icon-menu"></i>站点管理</el-menu-item></router-link>
        <router-link :to="{path: '/permissionAdmin'}"><el-menu-item index="4"><i class="el-icon-setting"></i>权限管理</el-menu-item></router-link>
      </el-menu>
    </el-col>
</template>
<script>
export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>
<style scoped>
  .nav-aside-wrapper {
    background-color: #eef1f6;
    height: 100%;
  }
</style>
