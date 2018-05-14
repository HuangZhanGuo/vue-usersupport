import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/login/login'
import header from '../components/login/header'
import register from '../components/register/register'
import index from '../components/common/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
  	{
  	  path: '/register',
  	  name: 'register',
        component: register,
  	},
    {
      path: '/index',
      name: 'index',
        component: index,
    }
  ]
})
