// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
Vue.prototype.$http = axios
Vue.config.productionTip = false

import '../static/css/bootstrap.min.css'
import '../static/css/bootstrap-theme.min.css'
import '../static/js/themes/default/default.css'
import '../static/css/common.css'

/* 设置跨域 */
Vue.prototype.HOST = '/api'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
