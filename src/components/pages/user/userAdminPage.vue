<template>
  <div>
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
          @click="dialogFormVisible = true">编辑</el-button>
          <el-button size="small" type="danger" @click="open2(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog title="编辑用户" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="用户名称" :label-width="formLabelWidth">
          <el-input auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="选择站点" :label-width="formLabelWidth">
          <el-select placeholder="请选择站点">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>
  <div>
    {{tableData}}
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
        formLabelWidth: '120px',
        dialogFormVisible: false
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete() {},
      open2(id) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
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
          console.dir(res)
          this.tableData = res.data.data
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