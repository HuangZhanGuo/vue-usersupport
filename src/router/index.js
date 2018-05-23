import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/login/login'
import header from '../components/login/header'
import register from '../components/register/register'
import index from '../components/common/index'
import attendance from '../components/attendance/attendance'
import acount from '../components/attendance/acount'
import managerment from '../components/userManagerment/managerment'
import loginRecord from '../components/userManagerment/loginRecord'
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
      children: [
        {
          path: '/r',
          component: register
        },
        {
          path: '/l',
          component: login
        },
        {
          path: '/attendance/attendance',
          component: attendance
        },
        {
          path: '/attendance/acount',
          component: acount
        },
         {
          path: '/um/managerment',
          component: managerment
        },
         {
          path: '/um/loginRecord',
          component: loginRecord
        }
      ]
    }
  ]
})
