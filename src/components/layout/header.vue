<template>
  <div class="header">
    <el-row :gutter="20">
      <el-col :span="8"  :offset="16">
        <div class="grid-content">
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="grid-content">
                <el-button type="text" class="headerLink">用户名</el-button>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <el-button type="text" class="headerLink">登录</el-button>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <el-button type="text" class="headerLink">退出</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  
}
</script>
<style scoped>
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple {
    background: #d3dce6;
  }
.header{
      height: 60px;
    background-color: #20a0ff;
    color: #fff;
    top: 0;
    left: 0;
    width: 100%;
    line-height: 60px;
    z-index: 100;
    position: absolute;
}
.headerLink{
      height: 60px;
    box-sizing: border-box;
    width: 100%;
    color:#FFFFFF;
}
.headerLink:hover{
      height: 60px;
    box-sizing: border-box;
    width: 100%;
    color:#D3DCE6;
}
</style>
