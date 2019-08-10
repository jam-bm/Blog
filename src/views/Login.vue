<template>
  <div id="login-form-wrap">
    <h2>Login</h2>
    <form id="login-form" @submit.prevent="login">
      <p>
      <input v-model="name" type="text" id="text" name="text" placeholder="Username" required><i class="validation"><span></span><span></span></i>
      </p>
      <p>
      <input v-model="password" type="password" id="password" name="password" placeholder="Password" required><i class="validation"><span></span><span></span></i>
      </p>
      <p>
      <input type="submit" id="login" value="Login">
      </p>
    </form>
    <div id="create-account-wrap">
      <p>Not a member? <router-link to="/signup">Create Account</router-link></p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      password: ''
    }
  },
  methods: {
    login: function () {
        let username = this.name 
        let password = this.password
        this.$store.dispatch('login', { username, password })
       .then(() => this.$router.push('/'))
       .catch(err => console.log(err))
      }
  },
}
</script>

<style scoped>
</style>
