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
  next({ path: '/machine' })
}

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
    beforeEnter: requireLine,
    originalPush
  },
  {
    path: '/machine',
    name: 'Machine',
    component: () => import('../views/Line.vue'),
    beforeEnter: requireAuth,
    originalPush
  },
  {
    path: '/mypage',
    name: 'mypage',
    component: () => import('../views/MypageView.vue')
    // children: [
    //   { path: '/', name: 'profile', component: () => import('../components/Profile.vue') },
    //   { path: '/password', name: 'password', component: () => import('../components/Password.vue') }
    // ]
  },
  {
    path: '/teamInfoView',
    name: 'TeamInfoView',
    component: () => import('../views/TeamInfoView.vue')
    // beforeEnter: requireAuth,
    // originalPush
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
    component: () => import('../views/Monitoring.vue'),
    beforeEnter: requireAuth,
    originalPush
  },
  {
    path: '/process',
    name: 'machine',
    component: () => import('../views/Machine.vue'),
    beforeEnter: requireAuth,
    originalPush
  },
  {
    // board를 통해서 동적 라우팅을 응용하자.
    path: '/history',
    name: 'history',
    component: () => import('../views/History.vue'),
    beforeEnter: requireAuth,
    originalPush
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
