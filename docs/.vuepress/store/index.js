import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    programming: 'java'
  },
  mutations: {
    CHANGE_PROGRAMING(state, programming) {
      state.programming = programming
    }
  }
})

export default store