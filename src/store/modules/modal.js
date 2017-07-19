import * as Mutations from '../mutations'

// initial state
const state = {
  title: null,
  component: null,
  submitButton:{
    text: "Submit",
    submitFunction: null
  },
  closeButton: {
    text: "Cancel",
    cancelFunction: null
  },
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
    state.submitButton.text = payload.submitButton.text
    state.submitButton.submitFunction = payload.submitButton.submitFunction
    state.closeButton = payload.closeButton
    state.data = payload.data
  },
  [Mutations.CLOSE_MODAL](state ){
    state.open = false
  },


}

export default {
  state,
  getters,
  actions,
  mutations
}
