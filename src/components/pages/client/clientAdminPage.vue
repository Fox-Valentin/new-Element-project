<template>
  <div>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item>
      <router-link :to="{path: '/clientAddPage'}">
      <el-button type="primary">增加站点</el-button>
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
      label="站点名称"
      prop="name">
    </el-table-column>
    <el-table-column
      label="定向地址"
      prop="redirect">
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
  <el-dialog title="编辑用户" :visible.sync="dialogFormVisible"  size="tiny">
      <el-form>
        <el-form-item label="站点名称" :label-width="formLabelWidth">
          <el-input auto-complete="off" v-model="row.name"></el-input>
        </el-form-item>
        <el-form-item label="定向地址" :label-width="formLabelWidth">
          <el-input auto-complete="off" v-model="row.redirect"></el-input>
        </el-form-item>
      </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="">确 定</el-button>
    </div>
  </el-dialog>
  {{ row }}
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
        dialogFormVisible: false,
        row:{
          id:null,
          name:"",
          redirect:""
        }
      }
    },
    methods: {
      handleEdit(index, row) {
        this.dialogFormVisible = true
        this.row = row
      },
      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var params = {
            id:row.id
          }
          this.$http.post("http://192.168.1.75/admin/delete_client",params).then(
            (res)=>{
                if(res.data.msg == "删除成功"){
                  this.updateTableData()
                  this.$message({
                    type: 'success',
                    message: res.data.msg
                  });
                }
            },
            (err)=>{}
          )
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      updateTableData(){
        this.$http.get("http://192.168.1.75/admin/get_clients").then(
          (res)=>{
            this.tableData = res.data
          },
          (err)=>{
            console.log(err)
          }
        )
      },
      handleEditSubmit(){
        var params = {
          id:this.row.id,
          name:this.row.name,
          redirect:this.row.redirect
        }
        this.$http.post("http://192.168.1.75/admin/update_client",params).then(
          (res)=>{
            if(res.data.msg=='success'){
                this.updateTableData();
                this.$message({
                message: '恭喜你，编辑保存成功',
                type: 'success'
              });
            }
          },
          (err)=>{}
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
        this.$http.get("http://192.168.1.75/admin/get_clients").then(
          (res)=>{
            this.tableData = res.data
          },
          (err)=>{
            console.log(err)
          }
        )
    }
  }
</script>
<style scoped>
</style>