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
import Vue from "vue"
  export default {
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
        appendStore: null,
        lastNodeId:null,
        data:""
      };
    },
    mounted () {
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
      // 第一步 搜集所有的父id 确定树父级
      function setCidAry(ary){
          var temp = []
          var obj = {}
          for(var i in ary){
              temp.push(ary[i].cid)
          }
          //数组去重
          temp = _.uniq(temp)
          for(i in temp){
              obj[i] = []
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
      this.data2 = temp3
      console.log(JSON.stringify(temp3))

      Vue.http.interceptors.push(function(request, next) {
        var token = "Bearer " + this.$store.getters.getUserToken
        request.headers.set('Authorization', token)
        request.headers.set('Accept', "application/json")
        next()
      });
      this.$http.get("http://192.168.1.75/admin/getpermissionlist").then(
        (res)=>{
          var cidAry = setCidAry(res.data)
          var levelAry = setLevelAry(cidAry,res.data)
          //var temp
          //finalAry(levelAry,function(ary){ temp = ary})
          //console.log(temp)
          console.log(levelAry)
          console.log(res.data)
          //this.data = res.data
        },
        (err)=>{
          console.log(err)
        }
      )
    },
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
        store.append({ id: id++, label: 'testtest', children: [] }, data);
        console.log(store)
        console.log(data)
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
            //store.append({ id: id, label: value, children: [] }, data);
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
    }
  };
</script>
<style scoped>

</style>
