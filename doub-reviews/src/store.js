import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
  },
  //更改 Vuex 的 store 中的状态的唯一方法是提交 mutation Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数：
  mutations: {
    displaychange(state, status) {
      state.hide = status;
    },
    ADD_LOGIN_USER(state, data) { //登入，保存状态 
      sessionStorage.setItem("isLogin", true);
      state.isLogin = true
    },
    SIGN_OUT(state) { //退出，删除状态 
      sessionStorage.removeItem("isLogin");
      state.isLogin = false
    }
  },
  getters: {
    isLogin(state) {
      if (!state.isLogin) {
        state.isLogin = sessionStorage.getItem('isLogin'); //从sessionStorage中读取状态 
      }
      return state.isLogin
    }
  },

  actions: {

  }
})
