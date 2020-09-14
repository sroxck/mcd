import axios from 'axios'
const CancelToken = axios.CancelToken;
const source = CancelToken.source();
var server = axios.create({
  baseURL: 'http://localhost:3000/',
  
})
export default {
  signup(params) {
    return this.post('signup',params)
  },
  signin(params) {
    return this.post('signin',params)
  },
  los(params){
    return this.post('add', params)
  },
  get(url, params ) {
    return server({
      url,
      params,
      method: 'get'
    })
  },
  post(url, data ) {
    return server({
      url,
      data,
      method: 'post'
    })
  }
}