import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import  './assets/css/landing-page.min.css'
import  './assets/css/login.css'
import  './assets/vendor/bootstrap/css/bootstrap.min.css'
import  './assets/vendor/jquery/jquery.min'
import  './assets/vendor/simple-line-icons/css/simple-line-icons.css'
import Axios from 'axios'

Vue.prototype.$http = Axios;
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
