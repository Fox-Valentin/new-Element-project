<template>
    <el-col :span="4" class="nav-aside-wrapper">
      <el-menu default-active="null" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-message"></i>权限管理</template>
            <router-link :to="{path : '/roleAdminPage'}"><el-menu-item index="1-1">角色管理</el-menu-item></router-link>
            <router-link :to="{path: '/userAdminPage'}"><el-menu-item index="1-2">用户管理</el-menu-item></router-link>
        </el-submenu>
        <router-link :to="{path: '/clientAdminPage'}"><el-menu-item index="5"><i class="el-icon-menu"></i>站点管理</el-menu-item></router-link>
        <router-link :to="{path: '/permissionAdmin'}"><el-menu-item index="4"><i class="el-icon-setting"></i>权限管理</el-menu-item></router-link>
        <router-link :to="{path: '/editRoleRightsPage'}"><el-menu-item index="3"><i class="el-icon-menu"></i>角色权限修改</el-menu-item></router-link>
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-message"></i>导航一</template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <router-link :to="{path : '/index'}"><el-menu-item index="1-1">选项1</el-menu-item></router-link>
            <router-link :to="{path: '/index/other'}"><el-menu-item index="1-2">选项2</el-menu-item></router-link>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
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
