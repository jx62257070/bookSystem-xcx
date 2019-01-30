import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index/index'
import login from '@/components/login/login'
import register from '@/components/register/register'
Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'index',
    //   component: index
    // },
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
