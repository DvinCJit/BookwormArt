<template>
  <v-layout column align-center>
    <v-flex xs12 sm8 md6>
      <h1>Login</h1>
      <v-form
        v-model="formValidity"
        enctype="multipart/form-data"
        @submit.prevent="login"
      >
        <v-text-field
          id="email"
          v-model="email"
          label="Email"
          :rules="emailRules"
          required
        ></v-text-field>
        <v-text-field
          id="password"
          v-model="password"
          label="Password"
          :type="show ? 'text' : 'password'"
          :rules="passwordRules"
          required
        ></v-text-field>
        <v-btn
          id="submit"
          type="submit"
          color="#069688"
          class="black--text"
          :disabled="!formValidity"
          >Login</v-btn
        >
      </v-form>
      <p class="mt-4">
        Don't have an account? <a href="/register">Register.</a>
      </p>
      <ul>
        <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
      </ul>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      show: false,
      errors: null,
      emailRules: [
        (value) => !!value || 'Email is required',
        (value) => value.indexOf('@') !== 0 || 'Email should have a username',
        (value) => value.includes('@') || 'Email should include an @ symbol.',
        (value) =>
          value.indexOf('.') - value.indexOf('@') > 1 ||
          'Email should contain a valid domain.',
        (value) =>
          value.indexOf('.') <= value.length - 3 ||
          'Email should contain a valid domain extension.'
      ],
      passwordRules: [
        (value) => !!value || 'Password is required.',
        (value) =>
          value.length >= 5 ||
          'Password is too short, it must have 5 characters at least.',
        (value) =>
          value.length <= 20 ||
          "Password is too long, it can't have more than 20 characters."
      ],
      formValidity: false
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
        .catch((err) => {
          this.errors = err.response.data.errors
        })
    }
  }
}
</script>
