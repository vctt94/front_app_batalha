import * as Mutations from '../mutations'
import requestHelper from '../../utils/requestHelper'

const state = {
  status: 'battling',
  create:{
    step: 0,
    name: '',
    description: '',
    users: []
  },
  brackets: {},
  battle: {}

}

const getters = {}

const actions = {

  createBattle({commit}){

    const data = {
      name: state.create.name,
      description: state.create.description,
      usersSubscribed: state.create.users
    }

    requestHelper.makeBattle(JSON.stringify(data)).then(response=>{
      const data = {
        battle: response.data.data[0],
        status: 'battling'
      }
      commit(Mutations.SET_BATTLE_AND_STATUS, data)
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
  [Mutations.SET_BATTLE_STATUS](state, payload){
    state.status = payload.status
  },
  [Mutations.SET_BATTLE](state, battle){
    state.battle = battle
  },
  [Mutations.SET_BRACKET](state, brackets){
    state.brackets = brackets
  },
  [Mutations.SET_BATTLE_AND_STATUS](state,payload){
    state.battle = payload.battle
    state.brackets = payload.battle.brackets
    state.status = payload.status
  }


}

export default{
  state,
  getters,
  actions,
  mutations
}
