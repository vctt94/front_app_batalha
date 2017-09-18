import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

/*
 * modules
 */
import sidebar from './modules/sidebar'
import modal from './modules/modal'
import bracket from './modules/brackets'
import battle from './modules/battle'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    sidebar,
    modal,
    bracket,
    battle
  },
  strict: debug
})
