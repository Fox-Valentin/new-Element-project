<template>
<el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="角色名称">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="角色描述">
    <el-input type="textarea" v-model="form.description"></el-input>
  </el-form-item>
  <el-form-item label="选择站点">
  <el-select v-model="value" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
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
          desc: ''
        },
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }]
      }
    },
    methods: {
      onSubmit() {
        Vue.http.interceptors.push(function(request, next) {
          var token = "Bearer " + this.$store.getters.getUserToken
          console.log(token)
          request.headers.set('Authorization', token)
          request.headers.set('Accept', "application/json")
          next()
        });
        var params = {
          "name":this.form.name,
          "description":this.form.description,
          "permission":"1,2,3"
        }
        this.$http.post("http://192.168.1.75/admin/role",params).then(
        (res)=>{
          console.log(res)
        },(err)=>{
            console.log(err)
        })
      }
    }
  }
</script>
