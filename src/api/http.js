import axios from 'axios'
const CancelToken = axios.CancelToken;
const source = CancelToken.source();
var server = axios.create({
  baseURL: 'http://localhost:3000/',
  
})

server.interceptors.response.use(
 response => {
   return response.data
 }
)

export default {
  signup(params) {
    return this.post('signup',params)
  },
  signin(params) {
    return this.post('signin',params)
  },
  addPeijian(params) {
    return this.post('/addPeijian',params)
  },
  QueryPeijian(params) {
    return this.post('/QueryPeijian',params)
  },
  modifyPeiJian(params) {
    return this.post('/modifyPeiJian',params)
  },
  removePeiJian(params) {
    return this.post('/removePeiJian',params)
  },
  getAccessories(params) {
    return this.post('/getAccessories',params)
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