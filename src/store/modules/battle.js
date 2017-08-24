import * as Mutations from '../mutations'

const state = {
  create:{
    step: 0,
    data: {
      name: '',
      description: '',
      users: []
    }
  }

}

const getters = {}

const mutations = {
  [Mutations.INCREMENT_CREATE_STEP](state){
    state.create.step++
  },
  [Mutations.DECREMENT_CREATE_STEP](state){
    state.create.step--
  },
  [Mutations.SET_BATTLE_NAME](state, payload){
    state.create.name = payload.name
  },
  [Mutations.SET_BATTLE_DESCRIPTION](state, payload){
    state.create.description = payload.description
  },
  [Mutations.SET_BATTLE_USERS](state, payload){
    state.create.users = payload.users
  },


}

export default{
  state,
  getters,
  mutations
}
