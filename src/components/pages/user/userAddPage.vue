<template>
<el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="用户名称">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="用户密码">
    <el-input v-model="form.password"></el-input>
  </el-form-item>
  <el-form-item label="用户邮箱">
    <el-input v-model="form.email"></el-input>
  </el-form-item>
  <el-form-item label="选择角色">
    <el-checkbox-group v-model="checkList">
      <el-checkbox v-for="item,key in checkListData" :label="item.id">{{item.name}}</el-checkbox>
    </el-checkbox-group>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
  </el-form-item>
  <div>
    {{data}}
  </div>
</el-form>
</template>
<script>
import Vue from "vue"
  export default {
    data() {
      return {
        data:[],
        form: {
          name: '',
          password: '',
          email: ''
        },
        checkList: [],
        checkListData:[]        
      }
    },
    mounted() {
      Vue.http.interceptors.push(function(request, next) {
        var token = "Bearer " + localStorage.getItem("currentUser_token")
        request.headers.set('Authorization', token)
        request.headers.set('Accept', "application/json")
        next()
      });
      this.$http.post("http://192.168.1.75/admin/role/index").then(
      (res)=>{
        this.checkListData = res.data.data
      },(err)=>{
          console.log(err)
      })
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
          password:this.form.password,
          email:this.form.email,
          roles:this.checkListData.join(",")
        }
        this.$http.post("http://192.168.1.75/admin/user",params).then(
        (res)=>{
          if(res.data.msg === "success"){
            this.$router.replace("/userAdminPage")
          }
        },(err)=>{
            console.log(err)
        })
      }
    }
  }
</script>
