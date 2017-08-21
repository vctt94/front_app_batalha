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

  getBattles(){
    return this.mountGetRequest('/battle/get-battles')
  },
  getGroups(){
    return this.mountGetRequest('/group/get-all-groups')
  },
  getUsers(){
    return this.mountGetRequest('/user/get-all-users')
  },

}

export default RequestHelper


