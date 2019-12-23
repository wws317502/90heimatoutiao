import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/index.vue'
import login from '../views/login/index.vue'
import home2 from '../views/home/hemo.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    children: [{
      path: '',
      component: home2
    }, {
      path: '/home/comment', // 完整 相对
      component: () => import('../views/comment/index.vue')
    }, {
      path: 'material', // 完整 相对
      component: () => import('../views/material/index.vue')
    }]

  }, {
    path: '/login',
    component: login
  }
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
