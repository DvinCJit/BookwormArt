<template>
  <v-app>
    <v-container>
      <v-layout column justify-center align-center>
        <v-flex xs12 sm8 md6>
          <h1>Imagery List</h1>
          <ImageryCard
            v-for="(imagery, index) in imageries"
            :key="index"
            :imagery="imagery"
            :index="index"
          />
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import ImageryCard from '@/components/ImageryCard.vue'

export default {
  components: {
    ImageryCard
  },
  async fetch({ store, error }) {
    try {
      await store.dispatch('imageries/fetchImageries')
    } catch (e) {
      error({
        statusCode: 503,
        message: 'Unable to fetch imagery list at this time. Please try again.'
      })
    }
  },
  computed: mapState({
    imageries: (state) => state.imageries.imageries
  })
}
</script>
