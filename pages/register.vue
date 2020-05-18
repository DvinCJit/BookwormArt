<template>
  <v-layout column align-center>
    <v-flex xs12 sm8 md6>
      <h1>Register</h1>
      <v-form @submit.prevent="register">
        <v-text-field id="full_name" v-model="full_name" label="Full Name">
        </v-text-field>
        <v-text-field id="nickname" v-model="nickname" label="Nickname">
        </v-text-field>
        <v-text-field id="email" v-model="email" label="Email"> </v-text-field>
        <v-text-field
          id="password"
          v-model="password"
          label="Password"
        ></v-text-field>
        <v-btn
          id="submit"
          type="submit"
          color="lime accent-3"
          class="black--text"
          >Register</v-btn
        >
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      full_name: '',
      nickname: '',
      email: '',
      password: ''
    }
  },
  methods: {
    register() {
      this.$store.dispatch('register', {
        full_name: this.full_name,
        nickname: this.nickname,
        email: this.email,
        password: this.password
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
