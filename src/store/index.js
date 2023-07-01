
import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage'

Vue.use(Vuex)

const TOUKEN_KEY = 'TOUTIAO_USER'
export default new Vuex.Store({
  state: {
    // 用户的登录信息
    // 一个对象，存储当前登录用户信息
    // user: null
    // 直接从本地存储取数据
    // 现在取出来的数据是一个字符串，但我们最好把这个字符串转换了对象，方便以后使用
    // user: window.localStorage.getItem('TOUKEN_KEY')
    // user: JSON.parse(window.localStorage.getItem(TOUKEN_KEY))
    user: getItem(TOUKEN_KEY)

  },
  getters: {
  },
  mutations: {
    setUser (state, user) {
      state.user = user
      // 本地存储只能存储JSON字符串，而传过来的user是一个对象，所以要把对象转换为JSON字符串，不然只能存储两个Object。
      // window.localStorage.setItem('TOUTIAO_USER',JSON.stringify(user))
      setItem(TOUKEN_KEY, user)
    }
  },
  actions: {
  },
  modules: {
  }
})
