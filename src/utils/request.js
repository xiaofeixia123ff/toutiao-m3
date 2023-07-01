/* 封装 axios 请求模块 */
import axios from 'axios'
import store from '@/store'

const request = axios.create({
  baseURL: 'https://toutiao.itheima.net' // 基础路径
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  // config :本次请求的配置对象
  // config 里面的有一个属性：headers
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
// 响应拦截器

export default request
