<template>
  <div id="login-form-wrap" class="bg-white">
    <h2>Login</h2>
    <form id="login-form" @submit.prevent="login" :disabled="!username">
      <p>
      <input v-model="username" type="text" id="text" name="text" placeholder="Username" required><i class="validation"><span></span><span></span></i>
      </p>
      <p>
      <input v-model="password" type="password" id="password" name="password" placeholder="Password" required><i class="validation"><span></span><span></span></i>
      </p>
      <p>
      <input class="btn primary" type="submit" id="login" value="Login" :disabled=" !password || !username">
      </p>
    </form>
    <div id="create-account-wrap">
      <p>Not a member? <router-link to="/signup">Create Account</router-link></p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login() {
      // axios.post('https://go-blog-api.herokuapp.com/login', {username: this.name, password: this.password})
      axios.post('https://go-blog-api.herokuapp.com/login', 
      {
        username: this.username,
        password: this.password
      })
      .then( res => {
        console.log(res)
        this.$store.commit('setToken', res.data.token)
        this.$router.push('/')
        this.$store.commit('setCurrUser', this.username)
      })
      .catch( err => {
        alert(err)
      })
    }
  },
}
</script>

<style scoped>
.primary:hover {
  color: white;
}
</style>
