import axios from 'axios'
const CancelToken = axios.CancelToken;
const source = CancelToken.source();
var server = axios.create({
  baseURL: '/ims-api',
  headers: {
    "content-type": "application/json",
    "data-type": "json"
  }
})
export default {
  login(params) {
    return this.post('login', params)
  },
  logout(params) {
    return this.post('logout', params)
  },
  get(url, params = {}) {
    return server({
      url,
      params,
      method: 'get'
    })
  },
  post(url, data = {}) {
    return server({
      url,
      data,
      method: 'post'
    })
  }
}