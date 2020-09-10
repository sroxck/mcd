import request from '@/utils/request'

/*post请求*/
export function post(url,data) {
  return request({
    url: url,
    method: 'post',
    data
  })
}
/*get请求*/
export function get(url,params) {
  return request({
    url: url,
    method: 'get',
    params
  })
}
/*formData请求*/
export function formData(url, params) {
  return request({
    headers: {
      'Content-Type': 'multipart/form-data'  //multipart/form-data;boundary=--xxxxxxx   application/json
    },
    url: url,
    method: 'post',
    params
  })
}


