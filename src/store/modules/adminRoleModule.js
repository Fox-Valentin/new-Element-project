import Vue from "vue"
const state = {
  tableData:"11"
}

const getters = {
  getAdminTableData:state => state.tableData
}

const actions = {
  getAdminTableData({commit, state}){
    Vue.http.post("/api/adminRightsUserPageDataTable").then(
    (res)=>{
      commit("upadtegetAdminTableData",res.data.dataTable)
    },(err)=>{
        console.log(err)
    })
  }  
}

const mutations = {
  upadtegetAdminTableData(state,data){
    state.tableData = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}