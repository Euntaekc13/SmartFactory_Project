import Vue from 'vue'
import VueRouter from 'vue-router'
// import Sample from '../views/Sample.vue'

Vue.use(VueRouter)

// 로그인이 되어 있지 않으면 못 들어가게 해주는 네비게이션 가드이다.
const requireAuth = (to, from, next) => {
  const isAuth = localStorage.getItem('token')
  const loginPath = `/login?rPath=${encodeURIComponent(to.path)}`
  isAuth ? next() : next(loginPath)
}

const requireLine = (to, from, next) => {
  next({ path: '/line' })
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
    beforeEnter: requireLine
  },
  {
    path: '/line',
    name: 'line',
    component: () => import('../views/Line.vue'),
    beforeEnter: requireAuth
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    // board를 통해서 동적 라우팅을 응용하자.
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../components/Dashboard.vue')
  },
  // {
  //   path: '/monitoring/:id',
  //   name: 'monitoring',
  //   component: () => import('../views/Monitoring.vue')
  //   // requireAuth
  // },
  {
    path: '/monitoring/:id',
    name: 'monitoring',
    component: () => import('../views/Monitoring.vue')
    // beforeEnter: requireAuth
  },
  {
    path: '/machine',
    name: 'machine',
    component: () => import('../views/Machine.vue'),
    beforeEnter: requireAuth
  },
  {
    // board를 통해서 동적 라우팅을 응용하자.
    path: '/history',
    name: 'history',
    component: () => import('../views/History.vue'),
    beforeEnter: requireAuth
  },
  {
    path: '/*',
    name: '404page',
    component: () => import('../views/404View.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
