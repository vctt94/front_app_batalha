import * as Mutations from '../mutations'

// initial state
const state = {
  title: null,
  component: null,
  submitButton: "Submit",
  closeButton: "Cancel",
  open: false,
  data: null
}

// getters
const getters = {
}

// actions
const actions = {

}

// mutations
const mutations = {
  [Mutations.TOGGLE_MODAL](state, payload ){
    state.open = payload.status
    state.title = payload.title
    state.component = payload.component
    state.submitButton = payload.submitButton
    state.closeButton = payload.closeButton
    state.data = payload.data
  }

}

export default {
  state,
  getters,
  actions,
  mutations
}
