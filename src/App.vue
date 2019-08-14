<template>
  <div id="app">
    <nav class="navbar navbar-light bg-light static-top sticky-top">
      <div class="container">
        <router-link class="navbar-brand" to="/">Start Bootstrap</router-link>
        <!-- <a class="navbar-brand" href="#">Start Bootstrap</a> -->
        <div class="ml-auto">
          <router-link class="mr-5" to="/posts">Posts</router-link>
          <router-link class="mr-5" to="/dashboard">Dashboard</router-link>
          <span >{{$store.state.currUser}}</span>
          <span v-if="!$store.getters.isLoggedIn">
            <router-link class="mr-5" to="/login">Log In</router-link>
            <router-link class="btn btn-primary mr-5" to="/signup">Sign Up</router-link>
          </span>
          <span v-else class="logout"> | <a @click="logout">Logout</a></span>
          <!-- <a class="btn btn-primary" href="login.html">Sign In</a> -->
          
          <!-- <a class="" href="login.html">Log In</a> -->
        </div>
      </div>
    </nav>
    <router-view style="background-color: antiquewhite;"/>
  </div>
</template>

<script>
export default {
  computed : {
      isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
    },
    methods: {
      logout: function () {
        this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/login')
        })
      }
    },
    // created: function () {
    //   this.$http.interceptors.response.use(undefined, function (err) {
    //     return new Promise(function (resolve, reject) {
    //       if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
    //         this.$store.dispatch(logout)
    //       }
    //       throw err;
    //     });
    //   });
    // }
}
</script>

<style scoped>
  a {
    text-decoration: none;
  }
  .logout {
    cursor: pointer;
  }
</style>
