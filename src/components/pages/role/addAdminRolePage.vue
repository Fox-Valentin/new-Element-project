<template>
<el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="角色名称">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="角色描述">
    <el-input type="textarea" v-model="form.description"></el-input>
  </el-form-item>
  <el-form-item label="选择站点">
    <el-select v-model="optionValue" placeholder="请选择" size="large">
      <el-option
        v-for="item in options"
        :key="item.id"
        :label="item.name"
        :value="item.id">
      </el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
  </el-form-item>
  <div>
    {{optionValue}}
  </div>
</el-form>
</template>
<script>
import Vue from "vue"
  export default {
    data() {
      return {
        form: {
          name: '',
          desc: ''
        },
        options: [],
        optionValue: ''
      }
    },
    mounted() {
      Vue.http.interceptors.push(function(request, next) {
        var token = "Bearer " + localStorage.getItem("currentUser_token")
        request.headers.set('Authorization', token)
        request.headers.set('Accept', "application/json")
        next()
      });
      this.$http.get("http://192.168.1.75/admin/get_clients").then(
      (res)=>{
        this.options = res.data
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
          "name":this.form.name,
          "description":this.form.description,
          "permission":"1,2,3",
          "client_id":this.optionValue
        }
        this.$http.post("http://192.168.1.75/admin/role",params).then(
        (res)=>{
          if(res.data.msg === "success"){
            this.$router.replace("/adminRolePage")
          }
        },(err)=>{
            console.log(err)
        })
      }
    }
  }
</script>
