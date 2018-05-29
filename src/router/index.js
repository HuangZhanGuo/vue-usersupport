import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex/store'
import login from '../components/login/login'
import header from '../components/login/header'
import register from '../components/register/register'
import index from '../components/common/index'
import attendance from '../components/attendance/attendance'
import moneyRecord from '../components/logManagement/moneyRecord'
import generalJournal from '../components/logManagement/generalJournal'
import acount from '../components/attendance/acount'
import managerment from '../components/userManagerment/managerment'
import loginRecord from '../components/userManagerment/loginRecord'
import showService from '../components/customerService/showService'
import customerRecord from '../components/customerService/customerRecord'

import search from '../components/serviceManagerment/search'

import baseInfomation from '../components/systemConfig/base_infomation'
import resetPassword from '../components/systemConfig/reset_password'
import userManager from '../components/permissionManagerment/userManager'
import menuManager from '../components/permissionManagerment/menuManager'
import roleManager from '../components/permissionManagerment/roleManager'

Vue.use(Router)

const router = new Router({
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
          path: '/sc/base_infomation',
          component: baseInfomation
        },
        {
          path: '/sc/reset_password',
          component: resetPassword
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
          path: '/pm/userManager',
          component: userManager
        },
        {
          path: '/pm/menuManager',
          component: menuManager
        },
        {
          path: '/pm/roleManager',
          component: roleManager
        },
        {
         path: '/um/addUser',
         component: register
        },
         {
          path: '/um/managerment',
          component: managerment
        },
         {
          path: '/um/loginRecord',
          component: loginRecord
        },
        {
          path: '/customerService/showService',
          component: showService,
          },{
            path: '/logManagement/moneyRecord',
            component: moneyRecord
          },
          {
            path: '/logManagement/generalJournal',
            component: generalJournal
          },
          {
          path: '/customerService/customerRecord',
          component: customerRecord,
          },
          {
            path :'/serviceManagerment/search',
            component:search,
          }

      ]
    }
  ]
})
router.beforeEach(({meta,path},from,next)=>{
  const {auth = true} = meta
  
  var loginState = store.state.isLogin;
  var loginSession = sessionStorage.getItem('isLogin');
  console.log(sessionStorage.getItem('isLogin'));
  // if (to.path === '/' || to.path === '/regin') {
  //   sessionStorage.removeItem('isLogin')
  //  }
  if(loginState){
    if(path!='/'){next();}
    if(path=='/'){next('/index');}
  }
  if(!loginState){

    if(loginSession==null&&path=='/'){
      next();
    }
   
    if(path!='/'&&loginSession){
      next();
    }
    if(path=='/'&&loginSession){
      next('/index');
    }
    if(path!='/'&&!loginSession){
      next('/');
    }
  }
   
  })

  export default router