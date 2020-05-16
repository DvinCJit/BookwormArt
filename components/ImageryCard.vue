<template>
  <nuxt-link :to="'/imagery/' + imagery.id">
    <v-card>
      <v-card-title class="headline">
        {{ imagery.book }} by {{ imagery.author }}
      </v-card-title>
      <h3>{{ imagery.chapter }}</h3>
      <img :src="imagery.image.url" width="100%" />
      <v-card-text>
        <hr class="my-3" />
        <p>{{ imagery.fragment }}</p>
      </v-card-text>
      <!-- <v-card-actions>
        <v-spacer />
        <v-btn color="primary" nuxt to="">
          Comments
        </v-btn>
      </v-card-actions> -->
    </v-card>
  </nuxt-link>
</template>

<script>
export default {
  name: 'ImageryCard',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    imagery: Object
  },
  computed: {
    parsedDate() {
      const imageryDate = new Date(this.imagery.date)
      return imageryDate.toDateString()
    }
  }
}
</script>
