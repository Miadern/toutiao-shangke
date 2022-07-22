import Vue from 'vue'
import Vuex from 'vuex'
import { getToken, setToken } from '@/utils/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // token存放处
    user: getToken() || {},
    history: JSON.parse(localStorage.getItem('HEIMA_TOUTIAO_HISTORY')) || []
  },

  mutations: {
    // 修改token
    setUser(state, payload) {
      state.user = payload
      // 储存token
      setToken(payload)
    },
    // 添加历史列表
    setHistory(state, payload) {
      // 判断本地有没有HEIMA_TOUTIAO_HISTORY，没有则添加个空数组
      if (localStorage.getItem('HEIMA_TOUTIAO_HISTORY') == null) {
        localStorage.setItem('HEIMA_TOUTIAO_HISTORY', JSON.stringify([]))
      }
      // 取出本地的数组添加内容
      let res = JSON.parse(localStorage.getItem('HEIMA_TOUTIAO_HISTORY'))
      res.unshift(payload)
      // 去重
      res = [...new Set(res)]
      // 赋予history
      state.history = res
      // 放回本地
      localStorage.setItem('HEIMA_TOUTIAO_HISTORY', JSON.stringify(res))
    },
    // 删除所有历史
    removeAllHistory(state, payload) {
      localStorage.removeItem('HEIMA_TOUTIAO_HISTORY')
      state.history = []
    },
    // 删除单个历史
    removeItemHistory(state, payload) {
      // 取出本地数组
      const res = JSON.parse(localStorage.getItem('HEIMA_TOUTIAO_HISTORY'))
      // 删除所选项
      res.splice(payload, 1)
      // 赋予history
      state.history = res
      // 放回本地
      localStorage.setItem('HEIMA_TOUTIAO_HISTORY', JSON.stringify(res))
    }
  }
})
