// 处理拦截器 导航守卫
import router from '../router'
import progress from 'nprogress'
import 'nprogress/nprogress.css'
router.beforeEach(function (to, from, next) {
  progress.start()// 打开进度条
  //   console.log(to.path)
  if (to.path.startsWith('/home')) {
    let token = window.localStorage.getItem('user-token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
router.afterEach(() => {
  progress.done()// 关闭进度条
})
