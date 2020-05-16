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
import { mapState } from 'vuex'

export default {
  async fetch({ store, error, params }) {
    try {
      await store.dispatch('imageries/fetchImagery', params.id)
    } catch (e) {
      error({
        statusCode: 503,
        message: 'Unable to fetch imagery #' + params.id + '.Please try again.'
      })
    }
  },
  computed: mapState({
    imagery: (state) => state.imageries.imagery
  })
}
</script>
