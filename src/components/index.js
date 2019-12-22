import layoutAside from './home/layout-aside'
import breadCrumb from './common/bread-crumb.vue'
import layoutHeader from './home/lasyout-header'
export default {

  install (Vue) {
    Vue.component('layoutAside', layoutAside) // 注册一个全局组件
    Vue.component('layoutHeader', layoutHeader) // 注册一个全局组件
    Vue.component('bread-crumb', breadCrumb)
  }
}
