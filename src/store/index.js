import Vue from 'vue'
import Vuex from 'vuex'

import wine from './modules/wine'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    wine
  }
})

export default store
