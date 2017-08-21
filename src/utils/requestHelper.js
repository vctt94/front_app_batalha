import {getToken} from './auth'
import axios from 'axios'
import {API_URL, AUTHORIZED_HEADER, NO_AUTH_HEADER} from '../config/requestConfig'

const HEADER = {
  headers: NO_AUTH_HEADER,
  onDownloadProgress: progressEvent => {
    let percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
  }
}

const authorizedHeader =
  {
    headers: AUTHORIZED_HEADER,
    onDownloadProgress: progressEvent => {
      let percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
    },

  }

const RequestHelper = {
  mountGetRequest(path){
    return axios.get(API_URL + path,HEADER)
  },
  mountPostRequest(path,data){
    return axios.post(API_URL + path,data,HEADER)
  },
  mountAuthorizedPostRequest(path,data){
    return axios.post(API_URL + path, data, authorizedHeader)
  },
  mountDeleteRequest(path){
    return axios.delete(API_URL + path, HEADER)
  },
  mountPutRequest(path, data){
    return axios.put(API_URL + path,data,HEADER)
  },

  getLatestBattle(){
    return this.mountGetRequest('/battle/get-latest-battle')
  },
  finishBattle(data){
    return this.mountPutRequest('/battle/end-battle', data)
  },
  makeBattle(data){
    return this.mountPostRequest('/battle/make-battle',data)
  },

  updateBattle(data){
    return this.mountPutRequest('/battle/update-battle',data)
  },

  updateBattleWinner(data){
    return this.mountPutRequest('/battle/set-winner',data)
  },

  getBattles(){
    return this.mountGetRequest('/battle/get-battles')
  },

  createGroup(data){
    return this.mountPostRequest('/group/create-group',data)
  },
  updateGroup(id,data){
    return this.mountPutRequest('/group/update-group-by-id/'+id,data)
  },
  createUser(data){
    return this.mountPostRequest('/user/create-user',data)
  },
  updateUser(id,data){
    return this.mountPutRequest('/user/update-user-by-id/'+id,data)
  },
  getGroups(){
    return this.mountGetRequest('/group/get-all-groups')
  },
  getUsers(){
    return this.mountGetRequest('/user/get-all-users')
  },

  deleteGroup(id){
    return this.mountDeleteRequest('/group/delete-group-by-id/'+id)
  },

  searchUser(data){
    return this.mountPostRequest('/user/search-user-by-name',data)
  },

  createUser(data){
    return this.mountPostRequest('/user/create-user',data)
  },
  deleteUser(id){
    return this.mountDeleteRequest('/user/delete-user-by-id/'+id)
  },

}

export default RequestHelper


