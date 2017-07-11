  <template>
    <div >
      <v-breadcrumb :routerProp="routerProp"></v-breadcrumb>
      <el-tree
        :data="dataTable"
        default-expand-all
        node-key="id"
        ref="tree"
        highlight-current
        :props="defaultProps"
        :render-content="renderContent"
        >
      </el-tree>
      <el-dialog title="增加权限" :visible.sync="dialogFormVisibleAppend">
        <el-form>
          <el-form-item label="权限名称" :label-width="formLabelWidth">
            <el-input v-model="formAppend.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="权限描述" :label-width="formLabelWidth">
            <el-input v-model="formAppend.description" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleAppend = false">取 消</el-button>
          <el-button type="primary" @click="subAppend">确 定</el-button>
        </div>
      </el-dialog>
      
      <el-dialog title="编辑权限" :visible.sync="dialogFormVisibleEdit">
        <el-form>
          <el-form-item label="权限名称" :label-width="formLabelWidth">
            <el-input v-model="formEdit.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="权限描述" :label-width="formLabelWidth">
            <el-input v-model="formEdit.description" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
          <el-button type="primary" @click="subEdit">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>
<script>
import _ from 'lodash'
import Vue from "vue"
import vBreadcrumb from '@/layout/breadcrumb'
  export default {
    components: {
      vBreadcrumb
    },
    data() {
      return {
        routerProp:'权限管理',
        dataTable: null,
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        formAppend: {
          name: '',
          description:""
        },
        formEdit:{
          name: ''
        },
        tempFormData:{
          data:"",
          store:""
        },
        formLabelWidth: '120px',
        lastId:null,
        dialogFormVisibleAppend:false,
        dialogFormVisibleEdit:false,
        data:""
      };
    },
    mounted () {
        // this.$store.dispatch("getpermissionlist").then(()=>{
        //   this.dataTable = this.$store.getters.getAdminTableData
        // })
      Vue.http.interceptors.push(function(request, next) {
        var token = "Bearer " + this.$store.getters.getUserToken
        request.headers.set('Authorization', token)
        request.headers.set('Accept', "application/json")
        next()
      })
      this.$http.post("http://192.168.1.75/admin/getpermissionlist").then(
      (res)=>{
       this.dataTable = this.__treeDataFormate(res.data)
      },(err)=>{})
    },
    methods: {
      renderContent(h, { node, data, store }) {
        return (
          <span>
            <span>
              <span>{node.label}</span>
            </span>
            <span style="float: right; margin-right: 20px">
              <el-button size="mini" on-click={ () => this.handleEdit(store, data) }>编辑权限</el-button>
              <el-button size="mini" on-click={ () => this.appendDialog(store, data) }>添加权限</el-button>
              <el-button size="mini" on-click={ () => this.handleDelete(store, data) }>删除权限</el-button>
            </span>
          </span>);
      },
      updateDataTable(){
        this.$http.post("http://192.168.1.75/admin/getpermissionlist").then(
        (res)=>{
        this.dataTable = this.__treeDataFormate(res.data)
        },(err)=>{})
      },
      appendDialog(store, data) {
        this.dialogFormVisibleAppend = true
        this.tempFormData.store = store
        this.tempFormData.data = data
      },
      subAppend(){
        var params = {
          cid:this.tempFormData.data.id,
          name: this.formAppend.name,
          description: this.formAppend.description
        }
        this.$http.post("http://192.168.1.75/admin/permission",params).then(
          (res)=>{
            if(res.data.msg=='success'){
                this.lastId = null
                this.updateDataTable()
                this.dialogFormVisibleAppend = false
                this.$message({
                message: '添加成功',
                type: 'success'
              })
            }
          },(err)=>{})
      },
      handleDelete (store, data) {
        let params = {
          _method:"delete"
        }
        this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post('http://192.168.1.75/admin/permission/'+data.id, params).then((res) => {
            if(res.data.msg == "删除成功"){
              this.updateDataTable();
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }
          }, (err) => {
            console.log(err)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      handleEdit (store, data) {
        this.dialogFormVisibleEdit = true
        this.tempFormData.store = store
        this.tempFormData.data = data
        this.formEdit = {
          name:data.name,
          cid:data.cid,
          id:data.id,
          description:data.description
        }
        console.log(data)
      },
      subEdit(){
        var params = {
          name:this.formEdit.name,
          cid:this.formEdit.cid,
          description:this.formEdit.description,
          _method:"put"
        }
        this.$http.post("http://192.168.1.75/admin/permission/"+this.formEdit.id,params).then(
          (res)=>{
            if(res.data.msg=='success'){
                this.lastId = null
                this.updateDataTable()
                this.dialogFormVisibleEdit = false
                this.$message({
                message: '编辑成功',
                type: 'success'
              })
            }
          },(err)=>{}
        )
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
    }
  };
</script>
<style scoped>

</style>
