<template>
  <v-app>
    <v-container>
      <v-layout column justify-center align-center>
        <v-flex xs12 sm8 md6>
          <h1>{{ imagery.book }}</h1>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
// import { mapState } from 'vuex'
import ImageryService from '@/services/ImageryService.js'

export default {
  // async fetch({ store, error, params }) {
  //   try {
  //     await store.dispatch('imageries/fetchImagery', params.id)
  //   } catch (e) {
  //     error({
  //       statusCode: 503,
  //       message: 'Unable to fetch imagery #' + params.id + '.Please try again.'
  //     })
  //   }
  // },
  async asyncData({ params }) {
    const { data } = await ImageryService.getImagery(params.id)
    // eslint-disable-next-line no-console
    console.log(data)
    return {
      imagery: data
    }
  }
  // data() {
  //   return {
  //     id: this.$route.params.id
  //   }
  // },
  // computed: {
  //   ...mapState('imageries', ['imagery']),
  //   imagery() {
  //     // eslint-disable-next-line no-console
  //     console.log(this.id)
  //     // eslint-disable-next-line eqeqeq
  //     return this.imagery.find((el) => el._id == this.id)
  //   }
  // }
}
</script>
