<template>
  <v-layout column align-center>
    <v-flex xs12 sm8 md6>
      <h1>Login</h1>
      <v-form enctype="multipart/form-data" @submit.prevent="login">
        <v-text-field id="email" v-model="email" label="Email"></v-text-field>
        <v-text-field
          id="password"
          v-model="password"
          label="Password"
          :type="show ? 'text' : 'password'"
        ></v-text-field>
        <v-btn
          id="submit"
          type="submit"
          color="lime accent-3"
          class="black--text"
          >Login</v-btn
        >
      </v-form>
      <p class="mt-4">
        Don't have an account? <a href="/register">Register.</a>
      </p>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      show: false
    }
  },
  methods: {
    login() {
      this.$store
        .dispatch('users/login', {
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$router.push('/users/' + this.$store.state.users.user._id)
        })
    }
  }
}
</script>
