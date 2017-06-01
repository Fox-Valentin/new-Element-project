<template>
  <div class="login-wrap">
    <el-row type="flex" class="row-bg" justify="center" align="middle">
      <el-col :span="8">
        <div class="grid-content bg-purple-light">
          <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="用户名">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input v-model="form.pwd"></el-input>
              </el-form-item>
              <el-form-item class="button-wrap">
                <el-button type="primary" @click="login"  size="large">登陆</el-button>
                <el-button  @click="reset" size="large">重置</el-button>
              </el-form-item>
          </el-form>
        </div>
        </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      form: {
        name: '',
        pwd: ''
      }
    }
  },
  methods: {
    login () {
      let params = {
        name: this.form.name,
        pwd: this.form.pwd        
      }
      this.$http.post('/api/siginIn', {id: 123}).then((res) => {
        console.log(res.data.status)
      }, 
      (err) => {
        console.log(err)
      })
    },
    reset () {
      this.form.name = ''
      this.form.pwd = ''
    }
  }
}
</script>
<style scoped>
  .login-wrap{
    background-color: #E5E9F2;
    height: 100%;
  }
  .el-row {
    height: 100%;
  }
  .button-wrap{
    text-align: center;
  }

</style>
