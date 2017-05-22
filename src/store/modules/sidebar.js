import * as Mutations from '../mutations'


const state = {
	activeStatus : true
}

const getters = {}

const mutations = {
	[Mutations.UPDATE_SIDEBAR_ACTIVE_STATUS](state, payload ){
		state.activeStatus = payload.status
	}

}

export default{
	state,
	getters,
	mutations
}
