  <template>
    <div >
      <el-tree
        :data="data2"
        default-expand-all
        node-key="id"
        ref="tree"
        highlight-current
        :props="defaultProps"
        :expand-on-click-node="false"
        :render-content="renderContent"
        >
      </el-tree>
      <div class="buttons">
        <el-button @click="submitTreeData">保存</el-button>
      </div>
    </div>
</template>
<script>
import _ from 'lodash'
  export default {
    methods: {
      renderContent(h, { node, data, store }) {
        return (
          <span>
            <span>
              <span>{node.label}</span>
            </span>
            <span style="float: right; margin-right: 20px">
              <el-button size="mini" on-click={ () => this.editDialog(store, data) }>eidt</el-button>
              <el-button size="mini" on-click={ () => this.appendDialog(store, data) }>Append</el-button>
              <el-button size="mini" on-click={ () => this.removeDialog(store, data) }>Delete</el-button>
            </span>
          </span>);
      },
      appendDialog(store, data) {
        let id = ++this.frontId
        let params = {
          parentId: data.id,
          Id: id
        }
        this.$prompt('请输入权限名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^\w+$/,
          inputErrorMessage: '权限名称格式不正确'
        }).then(({ value }) => {
          params['label'] = value
          this.$http.post('/api/submitAppendOrigin', params).then((res) => {
            console.log(res.data.info)
            this.$message({
              type: 'success',
              message: '你的权限名称是: ' + value
            });
            store.append({ id: id, label: value, children: [] }, data);
          }, (err) => {
            console.log(err)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
      },
      removeDialog (store, data) {
        let params = {
          Id: data.id
        }
        this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post('/api/submitDeletedOrigin', params).then((res) => {
            console.log(res.data.info)
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            store.remove(data);
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
      editDialog (store, data) {
        console.log(data)
        this.$prompt('请输入权限名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^\w+$/,
          inputErrorMessage: '权限名称格式不正确'
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '你的权限名称是: ' + value
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
      },
      submitTreeData () {
      }
    },
    data() {
      return {
        data2: null,
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        frontId: 10,
        oldCheckedData: null,
        dialogFormVisible: false,
        dialogFormVisible2: false,
        form: {
          name: ''
        },
        formLabelWidth: '120px',
        appendData: null,
        appendStore: null
      };
    },
    mounted () {
      this.$http.post('/api/getTreeData', {id: 123}).then((res) => {
        this.data2 = res.data
      }, (err) => {
        console.log(err)
      })
      this.$http.post('/api/getTreeDataLasttId', {id: 123}).then((res) => {
        this.frontId = res.data
      }, (err) => {
        console.log(err)
      })

    }
  };
</script>
<style scoped>

</style>
