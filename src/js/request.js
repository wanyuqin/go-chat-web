import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:8081',
  
})

instance.interceptors.request.use(config => {
  // 在请求发送之前做一些处理
  return config
}, error => {
  // 处理请求错误
  console.log(error)
  return Promise.reject(error)
})

instance.interceptors.response.use(response => {
  // 在响应成功后做一些处理
  return response
}, error => {
  // 处理响应错误
  console.log(error)
  return Promise.reject(error)
})

export default instance
