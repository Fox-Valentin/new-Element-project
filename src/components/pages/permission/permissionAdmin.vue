  <template>
    <div >
      <el-tree
        :data="dataTable"
        default-expand-all
        node-key="id"
        ref="tree"
        highlight-current
        :props="defaultProps"
        :expand-on-click-node="false"
        :render-content="renderContent"
        >
      </el-tree>
      <el-dialog title="增加权限" :visible.sync="dialogFormVisibleAppend">
        <el-form>
          <el-form-item label="权限名称" :label-width="formLabelWidth">
            <el-input v-model="formAppend.name" auto-complete="off"></el-input>
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
  export default {
    data() {
      return {
        dataTable: null,
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        formAppend: {
          name: ''
        },
        formEdit:{
          name: ''
        },
        tempFormData:null,
        formLabelWidth: '120px',
        lastId:null,
        dialogFormVisibleAppend:false,
        dialogFormVisibleEdit:false,
        data:""
      };
    },
    mounted () {
      this.lastId = null
       var ary = [
        {cid:0,id:1,children:[],"label": "一级 1"},
        {cid:0,id:12,children:[],"label": "一级 2"},
        {cid:1,id:2,children:[],"label": "二级 1"},
        {cid:1,id:3,children:[],"label": "二级 2"},
        {cid:2,id:4,children:[],"label": "三级 1"},
        {cid:2,id:5,children:[],"label": "三级 2"},
        {cid:3,id:6,children:[],"label": "三级 3"},
        {cid:3,id:7,children:[],"label": "三级 4"},
        {cid:4,id:8,children:[],"label": "四级 1"},
        {cid:5,id:9,children:[],"label": "四级 2"}
      ]
      this.$store.dispatch("getpermissionlist").then(()=>{
        this.dataTable = this.$store.getters.getAdminTableData
      })
      Vue.http.interceptors.push(function(request, next) {
        var token = "Bearer " + this.$store.getters.getUserToken
        request.headers.set('Authorization', token)
        request.headers.set('Accept', "application/json")
        next()
      });
    },
    methods: {
      renderContent(h, { node, data, store }) {
        return (
          <span>
            <span>
              <span>{node.label}</span>
            </span>
            <span style="float: right; margin-right: 20px">
              <el-button size="mini" on-click={ () => this.handleEdit(store, data) }>eidt</el-button>
              <el-button size="mini" on-click={ () => this.appendDialog(store, data) }>Append</el-button>
              <el-button size="mini" on-click={ () => this.handleDelete(store, data) }>Delete</el-button>
            </span>
          </span>);
      },
      updateDataTable(){
        this.$store.dispatch("getpermissionlist").then(()=>{
          this.dataTable = this.$store.getters.getAdminTableData
        })
      },
      appendDialog(store, data) {
        this.dialogFormVisibleAppend = true
        tempFormData.store = store
        tempFormData.data = data
      },
      subAppend(){
        this.updateDataTable();
        var params = {
          id:"",
          cid:this.tempFormData.data.id,
          name: this.formAppend.name
        }
        this.$http.post("http://192.168.1.75/admin/user/permission",params).then(
          (res)=>{
            if(res.data.msg=='success'){
                this.lastId = null
                this.updateDataTable();
                this.$message({
                message: '添加成功',
                type: 'success'
              })
            }
          },(err)=>{})
      },
      handleDelete (store, data) {
        let params = {
          Id: data.id
        }
        this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post('http://192.168.1.75/admin/user/permission/'+data.id, params).then((res) => {
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
        tempFormData.store = store
        tempFormData.data = data
        this.formEdit = {
          name:data.name,
          id:data.id
        }
      },
      subEdit(){
        var params = {
          name:this.formEdit.name,
          id:this.formEdit.id
        }
        this.$http.post("http://192.168.1.75/admin/user/permission/"+this.formEdit.id,params).then()
      }
    }
  };
</script>
<style scoped>

</style>
