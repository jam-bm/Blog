import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/landing-page.min.css'
import './assets/css/login.css'
import './assets/vendor/bootstrap/css/bootstrap.min.css'
import './assets/vendor/jquery/jquery.min'
import './assets/vendor/simple-line-icons/css/simple-line-icons.css'
import Axios from 'axios'


const token = localStorage.getItem('token')
if (token) {
  Axios.defaults.headers.common['Authorization'] = 'Bearer '+token
  store.commit('setToken', token)
}

Vue.prototype.$Api = Axios;

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (!store.getters.isLoggedIn) {
    if (to.path === '/login' || to.path === '/signup') {
      next()
    } else if(to.path === '/') {
      next('/login')
    }
  } else {
    if (to.path === '/login' || to.path === '/signup') {
      next('/')
    } else {
      next()
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
