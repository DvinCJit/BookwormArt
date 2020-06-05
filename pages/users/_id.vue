<template>
  <v-app>
    <v-container>
      <v-layout row wrap justify-center align-center>
        <v-row>
          <v-col cols="12" center>
            <h1 class="text-center">{{ user.nickname }}</h1>
          </v-col>
        </v-row>
        <v-row v-if="userImageries.length !== 0">
          <v-col
            v-for="(imagery, index) in userImageries"
            :key="index"
            cols="12"
            md="4"
          >
            <ImageryCard :imagery="imagery" :index="index" />
          </v-col>
        </v-row>
      </v-layout>
      <div v-if="userImageries.length === 0">
        <p class="text-center">
          No imageries yet.
        </p>
        <p class="text-center">
          Found evocative imagery in a book you love?
          <a href="/users/imageries/create">Create Imagery.</a>
        </p>
      </div>
    </v-container>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import ImageryCard from '@/components/ImageryCard.vue'
import ImageryService from '@/services/ImageryService.js'

export default {
  components: {
    ImageryCard
  },
  async asyncData({ store }) {
    const { data } = await ImageryService.getMyImageries(
      store.state.users.user._id
    )
    return {
      userImageries: data
    }
  },
  // async fetch({ store, error }) {
  //   try {
  //     await store.dispatch('imageries/fetchMyImageries', this.user._id)
  //   } catch (e) {
  //     error({
  //       statusCode: 503,
  //       message: 'Unable to fetch imagery list at this time. Please try again.'
  //     })
  //   }
  // },
  data() {
    return {
      id: this.$route.params.id
    }
  },
  computed: {
    ...mapState('users', ['user'])
  },
  middleware: ['auth', 'setId']
  // created() {
  //   const userString = localStorage.getItem('user')
  //   if (userString) {
  //     const userData = JSON.parse(userString)
  //     this.$store.commit('SET_USER_DATA', userData)
  //   }
  // }
}
</script>
