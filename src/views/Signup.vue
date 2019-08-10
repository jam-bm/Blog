<template>
  <div id="login-form-wrap">
    <h2>Sign Up</h2>
    <form id="login-form">
      <p>
      <input v-model="name" type="text" id="text" name="text" placeholder="Username" required><i class="validation"><span></span><span></span></i>
      </p>
      <p>
      <input v-model="email" type="email" id="email" name="email" placeholder="Email Address" required><i class="validation"><span></span><span></span></i>
      </p>
      <p>
      <input v-model="password" type="password" id="password" name="password" placeholder="Password" required><i class="validation"><span></span><span></span></i>
      </p>
      <p>
      <input v-model="cPassword" type="password" id="cpassword" name="confirmPassword" placeholder="Confirm Password" required><i class="validation"><span></span><span></span></i>
      </p>
      <p>
      <input type="submit" id="login" :disabled="password == cPassword" value="Login">
      </p>
    </form>
    <div id="create-account-wrap"></div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      cPassword: '',
      is_admin : null
    }
  },
  methods: {
    register: function () {
        let data = {
          name: this.name,
          email: this.email,
          password: this.password,
          is_admin: this.is_admin
        }
        this.$store.dispatch('register', data)
       .then(() => this.$router.push('/'))
       .catch(err => console.log(err))
      }
  },
}
</script>

<style>

</style>

