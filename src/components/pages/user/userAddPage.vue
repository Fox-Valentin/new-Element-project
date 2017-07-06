<template>
<el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="用户名称">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="用户描述">
    <el-input type="textarea" v-model="form.description"></el-input>
  </el-form-item>
  <el-form-item label="选择站点">
    <el-select v-model="optionValue" placeholder="请选择" size="large">
      <el-option
        v-for="item in optionValue"
        :key="item.id"
        :label="item.name"
        :value="item.id">
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
          description: ''
        },
        options: [],
        optionValue: ''
      }
    },
    mounted() {
      Vue.http.int
    },
    methods: {
      onSubmit() {
      }
    }
  }
</script>
