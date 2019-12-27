import layoutAside from './home/layout-aside'
import breadCrumb from './common/bread-crumb.vue'
import layoutHeader from './home/lasyout-header'
import CoverImage from './publish/cover-image.vue'
import selectImage from './publish/select-image.vue'

import { quillEditor } from 'vue-quill-editor' // quill编辑器组件对象
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {

  install (Vue) {
    Vue.component('layoutAside', layoutAside) // 注册一个全局组件
    Vue.component('layoutHeader', layoutHeader) // 注册一个全局组件
    Vue.component('bread-crumb', breadCrumb)
    Vue.component('quill-editor', quillEditor)
    Vue.component('cover-image', CoverImage)
    Vue.component('select-image', selectImage)
  }
}
