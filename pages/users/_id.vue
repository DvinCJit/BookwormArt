<template>
  <v-app>
    <v-container>
      <v-layout column justify-center>
        <v-row>
          <v-col v-if="this.$store.state.users.user" cols="12" center>
            <h1 class="text-center">{{ user.nickname }}</h1>
          </v-col>
        </v-row>
        <v-row v-if="userImageries.length !== 0">
          <v-col
            v-for="(imagery, index) in userImageries"
            :key="index"
            cols="12"
            md="6"
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
          <nuxt-link to="/users/imageries/create">Create Imagery.</nuxt-link>
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
  computed: {
    ...mapState('users', ['user'])
  },
  middleware: ['auth', 'setId']
}
</script>
