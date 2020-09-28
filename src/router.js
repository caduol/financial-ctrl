import Vue from 'vue'
import Router from 'vue-router'
/* eslint-disable */

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/home',
    name: 'home',
    meta: {
      icon: 'home',
      title: 'Home'
    },
    component: () => import( /* webpackChunkName: "home" */ './pages/home/Home')

  }, {
    path: '/expense-list',
    name: 'expense-list',
    meta: {
      icon: 'list-ul',
      title: 'Despesas'
    },
    component: () => import( /* webpackChunkName: "expense-list" */ './pages/expense-list/ExpenseList')

  }, {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login'
    },
    component: () => import( /* webpackChunkName: "login" */ './pages/login/Login')

  }]
})


router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} - Financial`

  if (!window.uid && to.name !== 'login') {
    next({
      name: 'login'
    })
  } else {
    next()
  }
})

export default router;
