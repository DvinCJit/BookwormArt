<template>
  <v-layout column align-center>
    <v-flex xs12 sm8 md6>
      <h1>Register</h1>
      <v-form enctype="multipart/form-data" @submit.prevent="register">
        <v-text-field id="nickname" v-model="nickname" label="Nickname">
        </v-text-field>
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
          >Register</v-btn
        >
      </v-form>
      <p class="mt-4">Already a member? <a href="/register">Login.</a></p>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      nickname: '',
      email: '',
      password: '',
      show: false
    }
  },
  methods: {
    register() {
      this.$store
        .dispatch('users/register', {
          nickname: this.nickname,
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$router.push('/login')
        })
    }
  }
}
</script>

<style lang="scss" scoped></style>
