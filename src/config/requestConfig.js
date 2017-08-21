import {getToken} from '../utils/auth'

export const API_URL = "https://murmuring-meadow-23071.herokuapp.com"

// export const API_URL = "http://52.15.127.32:3000"

export const NO_AUTH_HEADER = {
  'Content-Type': 'application/json',
}


export const AUTHORIZED_HEADER =  {
  'Content-Type': 'application/json',
  'Authorization': getToken()
}



