<template>
  <div>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item>
      <router-link :to="{path: '/addAdminRolePage'}">
      <el-button type="primary">增加角色</el-button>
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
      label="角色描述"
      prop="description">
    </el-table-column>
    <el-table-column
      label="站点"
      prop="client_id">
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
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog title="角色编辑" :visible.sync="dialogFormVisible"   size="tiny">
   <el-form :model="row">
    <el-form-item label="角色名称" :label-width="formLabelWidth">
      <el-input v-model="row.name" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="角色描述" :label-width="formLabelWidth">
      <el-input v-model="row.description" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="所属站点" :label-width="formLabelWidth">
       <el-select v-model="row.client_id" placeholder="请选择活动区域">
        <template v-for="client in clients">
          <el-option :label="client.name" :value="client.id"></el-option>
        </template>
    </el-select>
    </el-form-item>
    <el-form-item label="权限列表" :label-width="formLabelWidth">
    <el-checkbox-group v-model="checkList">
      <template v-for="permission in permissions">
           <el-checkbox :label="permission.id">{{permission.name}}</el-checkbox>
     </template>
    </el-checkbox-group>
    
  </el-form-item>

     </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="handleEditSubmit">保存</el-button>
  </div>
</el-dialog>
  <div>
    
  </div>
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
        dialogFormVisible: false,
        formLabelWidth: '120px',
        row:{
          name:'',
          description:'',
          client_id:''
        },
        checkList:[],
        permissions:[],
        clients:[]
      }
    },
    methods: {
      handleEdit(index, row) {
        this.dialogFormVisible=true;
        this.row = row;
        this.checkList = row.permissions.map(ele => ele.id);
        console.log(this.row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      handleEditSubmit() {
        this.dialogFormVisible = false;
        let paramData = {
          _method: 'put',
          client_id: this.row.client_id,
          name: this.row.name,
          description: this.row.description,
          permissions: this.checkList
        }
        this.$http.post("http://192.168.1.75/admin/role/"+this.row.id, paramData).then(
      (res)=>{
        console.log(res.data);
        if(res.data.msg=='success'){
          this.refreshTable();
          this.$message({
          message: '恭喜你，编辑保存成功',
          type: 'success'
        });
        }
      },(err)=>{
          console.log(err)
      })
    },
    refreshTable(){
      this.$http.post("http://192.168.1.75/admin/role/index").then(
      (res)=>{
        this.$store.commit("upadtegetAdminTableData",res.data.data)
        this.tableData = this.$store.getters.getAdminTableData
      },(err)=>{
          console.log(err)
      })
    }
    },
    mounted () {
         this.$http.get("http://192.168.1.75/admin/getpermissionlist").then(
      (res)=>{
        this.permissions = res.data;
      },(err)=>{
          console.log(err)
      });
       this.$http.get("http://192.168.1.75/admin/get_clients").then(
      (res)=>{
        this.clients = res.data;
          console.log(this.clients)        
      },(err)=>{
          console.log(err)
      });
      Vue.http.interceptors.push(function(request, next) {
        request.method = 'POST';
        var token = "Bearer " + this.$store.getters.getUserToken
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