import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui' // 引入UI
import Component from './components'
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import './styles/index.less'
import axios from 'axios'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 设置axios常态请求值
Vue.prototype.$axios = axios // $data  $refs $route $router $emit
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Component)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
