<template>
<el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="站点名称">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="定向地址">
    <el-input v-model="form.redirect"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
  </el-form-item>
</el-form>
</template>
<script>
import Vue from "vue"
  export default {
    data() {
      return {
        form: {
          name: '',
          description: ''
        },
        options: [],
        optionValue: ''
      }
    },
    methods: {
      onSubmit() {
        Vue.http.interceptors.push(function(request, next) {
          var token = "Bearer " + localStorage.getItem("currentUser_token")
          request.headers.set('Authorization', token)
          request.headers.set('Accept', "application/json")
          next()
        });
        var params = {
          name:this.form.name,
          redirect:this.form.redirect
        }
        this.$http.post("http://192.168.1.75/admin/add_client",params).then(
        (res)=>{
          if(res.data.msg === "success"){
            this.$router.replace("/clientAdminPage")
          }
        },(err)=>{
            console.log(err)
        })
      }
    }
  }
</script>
