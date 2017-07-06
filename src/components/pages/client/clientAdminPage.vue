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
  </div>
</template>

<script>
import Vue from "vue"
  export default {
    data() {
      return {
        tableData: [{
          "date": "2016-05-02",
          "name": "王小虎",
          "address": "上海市普陀区金沙江路 1518 弄",
          "status":"y"
        }, {
          "date": "2016-05-04",
          "name": "王小虎",
          "address": "上海市普陀区金沙江路 1517 弄",
          "status":"y"
        }, {
          "date": "2016-05-01",
          "name": "王小虎",
          "address": "上海市普陀区金沙江路 1519 弄",
          "status":"y"
        }, {
          "date": "2016-05-03",
          "name": "王小虎",
          "address": "上海市普陀区金沙江路 1516 弄",
          "status":"y"
        }, {
          "date": "2016-05-03",
          "name": "王小虎",
          "address": "上海市普陀区金沙江路 1516 弄",
          "status":"y"
        }, {
          "date": "2016-05-03",
          "name": "王小虎",
          "address": "上海市普陀区金沙江路 1516 弄",
          "status":"y"
        }, {
          "date": "2016-05-03",
          "name": "王小虎",
          "address": "上海市普陀区金沙江路 1516 弄",
          "status":"y"
        }, {
          "date": "2016-05-03",
          "name": "王小虎",
          "address": "上海市普陀区金沙江路 1516 弄",
          "status":"n"
        }],
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
    }
  }
</script>
<style scoped>
</style>