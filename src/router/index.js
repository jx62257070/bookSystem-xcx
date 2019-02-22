import Vue from 'vue'
import Router from 'vue-router'
import user from '@/components/user/index'
import login from '@/components/login/login'
import admin from '@/components/admin/admin'
import register from '@/components/register/register'
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
