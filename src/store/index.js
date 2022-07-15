import Vue from 'vue'
import Vuex from 'vuex'
import { getToken, setToken } from '@/utils/auth'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // token存放处
    user: getToken() || {}
  },

  mutations: {
    // 修改token
    setUser(state, payload) {
      state.user = payload
      // 储存token
      setToken(payload)
    }
  }
})
