import axios from 'axios'
import JSONBig from 'json-bigint'
import { Message } from 'element-ui'
import router from '../router/index'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 设置axios常态请求值
axios.interceptors.request.use(function (config) {
  let token = localStorage.getItem('user-token')
  config.headers.Authorization = `Bearer ${token}`
  return config // 会用
}, function () {

})

axios.defaults.transformResponse = [function (data) {
  return JSONBig.parse(data)
}]

axios.interceptors.response.use(function (response) {
  return response.data ? response.data : {}
}, function (error) {
  // console.log(error)
  let status = error.response.status
  let message = ''
  switch (status) {
    case 400:
      message = '错误'
      break
    case 507:
      message = '服务器异常'
      break
    case 401:
      window.localStorage.removeItem('user-token')
      router.push('/login')
      break
    case 403:
      message = '没有权限'
      break
    default:
      break
  }
  Message({ type: 'warning', message })
  return Promise.rejest(error)
})
export default axios
