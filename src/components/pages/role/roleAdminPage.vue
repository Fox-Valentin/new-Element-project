<template>
  <div>
      <v-breadcrumb :routerProp="routerProp"></v-breadcrumb>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item>
      <router-link :to="{path: '/roleAddAdminPage'}">
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
  <el-dialog title="角色编辑" :visible.sync="dialogFormVisible" >
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
        <el-form-item label="选择权限"  :label-width="formLabelWidth">
            <el-tree
              :data="dataTableTree"
              show-checkbox
              default-expand-all
              node-key="id"
              ref="tree"
              highlight-current
              :props="defaultProps">
            </el-tree>
        </el-form-item>
      </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleEditSubmit">保存</el-button>
    </div>
  </el-dialog>
  <div>
    {{row}}
  </div>
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
        routerProp:"角色管理",
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
        permissions:[],
        clients:[],
        dataTableTree:[],
        defaultProps: {
          children: 'children',
          label: 'name'
        }
      }
    },
    methods: {
      setCheckedKeys() {
        this.$refs.tree.setCheckedKeys([])
        this.$refs.tree.setCheckedKeys(this.row.permissions.map(ele => ele.id));
      },
      handleEdit(index, row) {
        this.dialogFormVisible=true;
        this.row = row;
        var _this = this
        setTimeout(function(){
          _this.setCheckedKeys()
        },100)
      },
      handleDelete(index, row) {
        this.$confirm('此操作将永久删除角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var params = { _method: 'delete'}
          this.$http.post("http://192.168.1.75/admin/role/"+row.client_id,params).then(
            (res)=>{
                if(res.data.msg === "删除成功"){
                  this.refreshTable()
                  this.$message({
                    type: 'success',
                    message: res.data.msg
                  });
                }
            },
            (err)=>{}
            )
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      handleEditSubmit() {
        this.dialogFormVisible = false;
        let paramData = {
          _method: 'put',
          client_id: this.row.client_id,
          name: this.row.name,
          description: this.row.description,
          permissions: this.$refs.tree.getCheckedKeys()
        }
        this.$http.post("http://192.168.1.75/admin/role/"+this.row.id, paramData).then(
          (res)=>{
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
        },
        __treeDataFormate(ary){
          // 第一步 搜集所有的父id 确定树父级
                function setCidAry(ary){
                    var temp = []
                    var obj = {}
                    for(var i in ary){
                        temp.push(ary[i].cid)
                        ary[i]["children"] = []
                    }
                    //数组去重
                    temp = _.uniq(temp)
                    for(i in temp){
                        obj[temp[i]] = []
                    }
                    return obj
                }

                //第二步 根据搜集到的父id，对原始数据分层级
                function setLevelAry(cidary,ary){
                    for(var i in ary){
                        cidary[ary[i].cid].push(ary[i])
                    }
                    return cidary
                }
                //第三步 从分层数据开始，从后向前寻找对应的父节点，合并到父节点，并删除子节点
                function finalAry(levelAry,ary){
                      _.forInRight(levelAry,function(val,key){
                            for(var i in ary){
                                  if(ary[i].id == key){
                                        for(var j in val){
                                              ary[i].children.push(val[j])
                                        }
                                  }
                            }
                      })
                      var obj = []
                      for(var i = 0; i < levelAry[0].length; i++){
                            obj.push(ary[i])
                      }
                      return obj
                }
                var temp1 = setCidAry(ary)
                var temp2 = setLevelAry(temp1,ary)
                var temp3 = finalAry(temp2,ary)
                return temp3
          }
    },
    mounted () {
      Vue.http.interceptors.push(function(request, next) {
        var token = "Bearer " + this.$store.getters.getUserToken
        request.headers.set('Authorization', token)
        request.headers.set('Accept', "application/json")
        next()
      });
         this.$http.get("http://192.168.1.75/admin/getpermissionlist").then(
      (res)=>{
        this.dataTableTree = this.__treeDataFormate(res.data)
      },(err)=>{
          console.log(err)
      });
       this.$http.get("http://192.168.1.75/admin/get_clients").then(
      (res)=>{
        this.clients = res.data;
      },(err)=>{
          console.log(err)
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