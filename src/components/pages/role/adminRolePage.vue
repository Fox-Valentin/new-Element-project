<template>
  <div>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item>
      <router-link :to="{path: '/addAdminRolePage'}">
      <el-button type="primary">增加角色</el-button>
      </router-link>
      <el-button type="primary" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button>
    </el-form-item>
  </el-form>
  <el-table
    :data="tableData"
    border
    style="width: 100%"
    >
    <el-table-column
      label="ID"
      width="180"
      sortable
      prop="id"
      >
    </el-table-column>
    <el-table-column
      label="角色名称"
      prop="name">
    </el-table-column>
    <el-table-column
      label="角色描述"
      prop="description">
    </el-table-column>
    <el-table-column
      label=" 创建时间"
      prop="created_at">
    </el-table-column>
    <el-table-column
      label="更新时间"
      prop="updated_at">
    </el-table-column>
    <el-table-column label="操作">
      <template scope="scope">
        <el-button
          size="small"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
    <div slot="footer" class="dialog-footer">
      <el-form>
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>
  <div>{{tableData}}</div>
  </div>
</template>

<script>
import Vue from "vue"
  export default {
    data() {
      return {
        tableData: [],
        formInline: {
          user: '',
          region: ''
        },
        formLabelWidth: '120px',
        dialogFormVisible: false
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(roleId) {
          Vue.http.interceptors.push(function(request, next) {
            var token = "Bearer " + localStorage.getItem("currentUser_token")
            request.headers.set('Authorization', token)
            request.headers.set('Accept', "application/json")
            next()
          });
          
          this.$http.get("http://192.168.1.75/admin/role/12",{_method:"delete"}).then(
          (res)=>{
            console.log(res.data)
          },(err)=>{
              console.log(err)
          })
      }
    },
    mounted () {
      Vue.http.interceptors.push(function(request, next) {
        var token = "Bearer " + localStorage.getItem("currentUser_token")
        request.headers.set('Authorization', token)
        request.headers.set('Accept', "application/json")
        next()
      });
      this.$http.post("http://192.168.1.75/admin/role/index").then(
      (res)=>{
        this.$store.commit("upadtegetAdminTableData",res.data.data)
        this.tableData = this.$store.getters.getAdminTableData
      },(err)=>{
          console.log(err)
      })
    }
  }
</script>
<style scoped>
</style>