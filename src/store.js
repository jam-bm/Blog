import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router'

const BASE_URL = 'https://go-blog-api.herokuapp.com'
const Api = axios.create({
  baseURL: BASE_URL,
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
    users : [],
    posts: [],
    comments: [],
    currUser: localStorage.getItem('user') || ''
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
      state.currUser = ''
    },
    setToken(state, token) {
      state.token = token 
      Api.defaults.headers.common['Authorization'] = 'Bearer ' + token
      localStorage.setItem('token', token)
    },
    setUsers(state, users) {
      state.users = users
    },
    setPosts(state, posts) {
      state.posts = posts
    },
    setComments( state, comments) {
      state.comments = comments
    },
    setCurrUser(state, user) {
      state.currUser = user
      localStorage.setItem('user', user)
    }
  },
  actions: {
    // login({commit}, user){
    //   console.log(user)
    //   return new Promise((resolve, reject) => {
    //     commit('auth_request')

    //     // fetch('https://go-blog-api.herokuapp.com/login', {
    //     //   method: 'post',
    //     //   credentials: 'include',
    //     //   headers: {
    //     //     'Accept': 'application/json',
    //     //     'Content-Type': 'application/json'
    //     //   },
    //     //   body: JSON.stringify(user)
    //     // }).then( res => res.json())
    //     //   .then( data => console.log(data));
    //     Api.post({url: 'https://go-blog-api.herokuapp.com/login/', data: user})
    //     .then(resp => {
    //       console.log(resp)
    //       const token = resp.data.token
    //       const user = resp.data.user
    //       localStorage.setItem('token', token)
    //       axios.defaults.headers.common['Authorization'] = token
    //       commit('auth_success', token, user)
    //       resolve(resp)
    //     })
    //     .catch(err => {
    //       commit('auth_error')
    //       localStorage.removeItem('token')
    //       reject(err)
    //     })
        
    //   })
    // },
    register({commit}, user){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios.post({url: 'https://go-blog-api.herokuapp.com/register', data: user })
        .then(resp => {
          const token = resp.data.token
          const user = resp.data.user
          localStorage.setItem('token', token)
          Api.defaults.headers.common['Authorization'] = token
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
    async getApi({state}, url) {
      // try{
        // const {data} = await Api.get('/auth/' + url ) // response.data = , response.config,
        return fetch(BASE_URL + '/auth/' + url, {
          credentials: 'include',
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${state.token}`
          }
        })
        .then( res => res.json())
        .then( data => data)
        .catch( err => alert(err))
      // } 
      // catch(error) { console.log(error)}
    },
    async getUsers({commit, dispatch}){
      let data = await dispatch('getApi', 'users')
      commit('setUsers', data)
    },
    async getPosts({commit, dispatch}){
      let data = await dispatch('getApi', 'posts')
      commit('setPosts', data)
    },
    async getComments({commit, dispatch}){
      let data = await dispatch('getApi', 'comments')
      commit('setComments', data)
    },
    logout({commit}){
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        delete Api.defaults.headers.common['Authorization']
        resolve()
      })
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,  // true or false
    authStatus: state => state.status,
    featuredPosts (state) {
      return state.posts && state.posts.slice(0, 3) 
    },
  }
})
