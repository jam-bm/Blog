import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router'

const Api = axios.create({
  baseURL: 'https://go-blog-api.herokuapp.com/',
  timeout: 30000,
  headers: {
      'Content-Type': 'application/json'
  }
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user : {},
    posts: [
      {imgUrl:require('@/assets/img/bg-showcase-1.jpg'), title: 'Fully Responsive Design', description: 'When you use a theme created by Start Bootstrap, you know that the theme will look great on any device, whether it\'s a phone, tablet, or desktop the page will behave responsively!'},
      {imgUrl:require('@/assets/img/bg-showcase-2.jpg'), title: 'Updated For Bootstrap 4', description: 'Newly improved, and full of great utility classes, Bootstrap 4 is leading the way in mobile responsive web development! All of the themes on Start Bootstrap are now using Bootstrap 4!'},
      {imgUrl: require('@/assets/img/bg-showcase-3.jpg'), title: 'Easy to Use &amp; Customize', description: 'Landing Page is just HTML and CSS with a splash of SCSS for users who demand some deeper customization options. Out of the box, just add your content and images, and your new landing page will be ready to go!'}
  ]
  },
  mutations: {
    auth_request(state){
      state.status = 'loading'
    },
    auth_success(state, token, user){
      state.status = 'success'
      state.token = token
      state.user = user
    },
    auth_error(state){
      state.status = 'error'
    },
    logout(state){
      state.status = ''
      state.token = ''
    },
  },
  actions: {
    login({commit}, user){
      console.log(user)
      return new Promise((resolve, reject) => {
        commit('auth_request')

        fetch('https://cors-anywhere.herokuapp.com/https://go-blog-api.herokuapp.com/login', {
          method: 'post',
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        }).then( res => res.json())
          .then( data => console.log(data));
        // axios.post('https://go-blog-api.herokuapp.com/login/', user, {
        //   headers: {
        //     'Content-Type': 'application/json'
        //   }
        // })
        // .then(resp => {
        //   console.log(resp)
        //   const token = resp.data.token
        //   const user = resp.data.user
        //   localStorage.setItem('token', token)
        //   axios.defaults.headers.common['Authorization'] = token
        //   commit('auth_success', token, user)
        //   resolve(resp)
        // })
        // .catch(err => {
        //   commit('auth_error')
        //   localStorage.removeItem('token')
        //   reject(err)
        // })
      })
    },
    register({commit}, user){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: 'https://go-blog-api.herokuapp.com/register', data: user, method: 'POST' })
        .then(resp => {
          const token = resp.data.token
          const user = resp.data.user
          localStorage.setItem('token', token)
          axios.defaults.headers.common['Authorization'] = token
          commit('auth_success', token, user)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error', err)
          localStorage.removeItem('token')
          reject(err)
        })
      })
    },
    logout({commit}){
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    }
  },
  getters : {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
  }
})
