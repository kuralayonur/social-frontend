import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

const userSession = new Vuex.Store({
  state: {
    username: null
  },
  mutations: {
    change (state, nuser) {
      state.username = nuser
    }
  },
  getters: {
    username: state => {
      return state.username
    }
  }
})
export default userSession
