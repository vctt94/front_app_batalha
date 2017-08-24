import * as Mutations from '../mutations'
import requestHelper from '../../utils/requestHelper'

const state = {
  status: 0,
  create:{
    step: 0,
    name: '',
    description: '',
    users: []
  }

}

const getters = {}

const actions = {

  createBattle({commit}){
    
    const data = {
      name: state.create.name,
      description: state.create.description,
      usersSubscribed: state.create.users
    }

    console.log(JSON.stringify(data))
    requestHelper.makeBattle(JSON.stringify(data)).then(response=>{
      console.log(response)
    })

  },

}

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
  [Mutations.SET_BATTLE_USERS](state, users){
    state.create.users = users
  },


}

export default{
  state,
  getters,
  actions,
  mutations
}
