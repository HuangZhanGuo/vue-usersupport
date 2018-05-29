import Vue from 'vue'
import Vuex from 'vuex'
 
Vue.use(Vuex);
 
const store = new Vuex.Store({
    state: {
      // 放置初始状态 app启动的时候的全局的初始值
      isLogin:false,     //初始时候给一个 isLogin=0 表示用户未登录
    },
    mutations:{
        changeLogin(state,data){
            state.isLogin = data;
          }
    },
    actions: {
      login ({commit}, data) {
        commit('changeLogin', data)
    }}
  })


export default store