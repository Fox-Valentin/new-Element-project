<template>
  <div>
      <v-breadcrumb :routerProp="routerProp"></v-breadcrumb>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <router-link :to="{path: '/permissionAdminPage'}">
          <el-button type="primary">返回权限管理</el-button>
          </router-link>
        </el-form-item>
      </el-form>
    <el-form ref="form" :rules="rules" :model="form" label-width="80px">
      <el-form-item label="权限名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="权限描述" prop="description">
        <el-input type="textarea" v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import vBreadcrumb from '@/layout/breadcrumb'
export default {
    components: {
      vBreadcrumb
    },
  data(){
    return {
      routerProp:[
        {
          lebal:'权限管理',
          path:'/permissionAdminPage'
        },
        {
          lebal:'添加权限',
          path:'/permissionAddPage'
        },
      ],
      form:{
        name:"",
        description:""
      },
      rules:{
        name:[
            { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        description:[
           { required: true, message: '请输入描述', trigger: 'blur' }
        ]
      }
    }
  },
  methods:{
    onSubmit(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
              var params = {
                cid:0,
                name: this.form.name,
                description: this.form.description
              }
              this.$http.post("http://192.168.1.75/admin/permission",params).then(
                (res)=>{
                  if(res.data.msg=='success'){
                      this.dialogFormVisibleAppend = false
                      this.$message({
                      message: '添加成功',
                      type: 'success'
                    })
                    this.$router.replace("/permissionAdminPage")
                  }
                },(err)=>{})
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    }
  }
}
</script>
<style scoped>
</style>
