import * as Mutations from '../mutations'


const state = {
	activeStatus : true
}

const getters = {}

const mutations = {
	[Mutations.TOGGLE_SIDEBAR](state, status ){
		state.activeStatus = status
	}

}

export default{
	state,
	getters,
	mutations
}
