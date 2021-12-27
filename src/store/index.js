import Vue from 'vue'
import Vuex from 'vuex'

import state from './state/index.js'
import mutations from './mutations/index.js'
import getters from './getters/index.js'
import actions from './actions/index.js'
import modules from './modules/index.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  modules,
})

export default store
