import Vue from 'vue'
import Router from 'vue-router'
import user from '@/components/user/index'
import login from '@/components/login/login'
import register from '@/components/register/register'
Vue.use(Router)

export default new Router({
  routes: [
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
