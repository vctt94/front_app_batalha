import * as Mutations from '../mutations'
import requestHelper from '../../utils/requestHelper'
import Vue from 'vue'


const state = {
  connect: false,
  round: null
}

const getters = {}

const actions = {

  // payload object containing round_id and person._id
  socket_updateBattle(context, payload){

    const request = {
      round_id  : payload.roundId,
      user_id   : payload.personId,
      battle_id : payload.battleId
    }
    let test = (new Vue()).$socket.emit('battle-update',request)

    // context.dispatch('updateBattle',request)
    // requestHelper.updateBattle(JSON.stringify(request)).then(response=>{
    //   const round = response.data.data.round
    //   payload.round_id = round._id
    //   commit.dispatch('battleUpdated', request)
    // }).catch(err=>{
    //   console.log(err)
    // })
  }
}

const mutations = {
  SOCKET_CONNECT: (state,  status ) => {
    state.connect = true;
  },
}

export default{
  state,
  getters,
  actions,
  mutations
}
