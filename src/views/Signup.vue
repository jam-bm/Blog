<template>
  <div id="login-form-wrap" class="bg-white">
    <h2>Sign Up</h2>
    <form id="login-form" @submit.prevent="register">
      <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
      </p>
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
      <input class="btn" type="submit" id="login" value="Sign Up">
      </p>
    </form>
    <div id="create-account-wrap"></div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      cPassword: '',
      is_admin : null,
      errors: []
    }
  },
  methods: {
    register(e) {
        this.errors = [];

        if (!this.name) {
          this.errors.push("Name required.");
        }
        if (!this.email) {
          this.errors.push('Email required.');
        } else if (!this.validEmail(this.email)) {
          this.errors.push('Valid email required.');
        }

        if (!this.errors.length) {
          return true;
        }
        

        let data = {
          username: this.name,
          email: this.email,
          password: this.password
        }
      //   this.$store.dispatch('register', data)
      //  .then(() => {
      //    this.$store.commit('setToken', res.data.token)
      //    this.$router.push('/')
      //    })
      //  .catch(err => console.log(err))

       axios.post('https://go-blog-api.herokuapp.com/register', data)
      .then( res => {
        console.log(res)
        this.$store.commit('setToken', res.data.token)
        this.$router.push('/')
      })
      .catch( err => {
        alert(err)
      })
    },
    validEmail: function (email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
  },
}
</script>

<style>

</style>

