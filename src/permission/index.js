// 处理拦截器
import router from '../router'
router.beforeEach(function (to, from, next) {
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
