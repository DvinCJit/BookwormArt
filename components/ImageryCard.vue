<template>
  <v-card>
    <!-- <nuxt-link :to="'/users/imageries/' + imagery._id"></nuxt-link> -->
    <v-card-title class="headline">
      {{ imagery.book }} by {{ imagery.author }}
    </v-card-title>

    <v-card-subtitle>{{ imagery.chapter }}</v-card-subtitle>
    <img :src="imagery.image.url" width="100%" />
    <v-card-text>
      <hr class="my-3" />
      <p>{{ imagery.fragment }}</p>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-icon color="primary" nuxt to="" class="mr-4">
        mdi-pencil-outline
      </v-icon>
      <v-icon color="primary" nuxt to="">
        mdi-trash-can-outline
      </v-icon>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'ImageryCard',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    imagery: Object
  }
}
</script>
