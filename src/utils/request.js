import axios from 'axios'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 设置axios常态请求值
axios.interceptors.request.use(function (config) {
  let token = localStorage.getItem('user-token')
  config.headers.Authorization = `Bearer ${token}`
  return config // 会用
}, function () {

})
export default axios
