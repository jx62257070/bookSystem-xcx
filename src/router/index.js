import Vue from 'vue'
import Router from 'vue-router'
import user from '@/pages/user/index'
import login from '@/pages/login/login'
import admin from '@/pages/admin/admin'
import register from '@/pages/register/register'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/admin',
      name: 'admin',
      component: admin
    },
    {
      path: '/user',
      name: 'user',
      component: user
    },
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    }
  ]
})
