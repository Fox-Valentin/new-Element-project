<template>
  <div>
      <v-breadcrumb :routerProp="routerProp"></v-breadcrumb>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item>
      <router-link :to="{path: '/userAddPage'}">
      <el-button type="primary">增加用户</el-button>
      </router-link>
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
      label="邮箱地址"
      prop="email">
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
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog title="编辑用户" :visible.sync="dialogFormVisible"   size="tiny">
      <el-form v-model="row">
        <el-form-item label="用户名称" :label-width="formLabelWidth">
          <el-input auto-complete="off"  v-model="row.name"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" :label-width="formLabelWidth">
          <el-input auto-complete="off"  v-model="row.password"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" :label-width="formLabelWidth">
          <el-input auto-complete="off"  v-model="row.email"></el-input>
        </el-form-item>
        <el-form-item label="角色选择" :label-width="formLabelWidth">
          <el-checkbox-group v-model="checkList">
            <template v-for="roleList in roleLists">
                  <el-checkbox :label="roleList.id">{{roleList.name}}</el-checkbox>
            </template>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleEditSubmit">确 定</el-button>
    </div>
  </el-dialog>
    {{row}}
  </div>
</template>

<script>
import Vue from "vue"
import _ from "lodash"
import vBreadcrumb from '@/layout/breadcrumb'
  export default {
    components: {
      vBreadcrumb
    },
    data() {
      return {
        routerProp:"用户管理",
        tableData: [],
        formInline: {
          user: '',
          region: ''
        },
        formLabelWidth: '120px',
        dialogFormVisible: false,
        row:{
          id:"",
          name:"",
          password:"",
          email:""
        },
        checkList:[],
        roleLists:[]
      }
    }, 
    methods: {
      handleEdit(index, row) {
        this.dialogFormVisible=true;
        this.row = row
        this.checkList = row.roles.map(ele => ele.id)
      },
      handleDelete(index, row) {
          this.$confirm('此操作将永久删除用户, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var params = { _method: 'delete'}
            this.$http.post("http://192.168.1.75/admin/user/"+row.id,params).then(
              (res)=>{
                if(res.data.msg == "删除成功"){
                  this.$message({
                    type: 'success',
                    message: res.data.msg
                  });
                }
              },
              (err)=>{})
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });          
          });
        },
      handleEditSubmit(){
        this.dialogFormVisible=false
        let params = {
          _method: 'put',
          name: this.row.name,
          password: this.row.password,
          email: this.row.email,
          roles: this.checkList
        }
        this.$http.post("http://192.168.1.75/admin/user/"+this.row.id,params).then(
          (res)=>{
            if(res.data.msg=='success'){
                this.refreshTable();
                this.$message({
                message: '编辑保存成功',
                type: 'success'
              });
            }
          },
          (err)=>{}
        )
      },
      refreshTable(){
        this.$http.post("http://192.168.1.75/admin/user/index").then(
          (res)=>{
            this.tableData = res.data.data
          },
          (err)=>{
            console.log(err)
          }
        )
      }
    },
    mounted () {
    Vue.http.interceptors.push(function(request, next) {
      var token = "Bearer " + this.$store.getters.getUserToken
      request.headers.set('Authorization', token)
      request.headers.set('Accept', "application/json")
      next()
    });
      this.$http.post("http://192.168.1.75/admin/user/index").then(
        (res)=>{
          this.tableData = res.data.data
        },
        (err)=>{
          console.log(err)
        }
      )
      this.$http.post("http://192.168.1.75/admin/role/index").then(
      (res)=>{
        this.roleLists = res.data.data;
      },(err)=>{
          console.log(err)
      });
    }
  }
</script>
<style scoped>
</style>