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
      <v-icon color="#069688" nuxt to="" class="mr-4">
        mdi-heart
      </v-icon>
      <v-icon color="#069688" nuxt to="" class="mr-4">
        mdi-comment-text-multiple
      </v-icon>

      <v-icon
        v-if="loggedIn"
        color="#069688"
        nuxt
        to="'/users/imageries/edit/' + imagery._id"
        class="mr-4"
        @click.prevent="goToEdit"
      >
        mdi-pencil-outline
      </v-icon>
      <v-icon v-if="loggedIn" color="#069688" @click.prevent="sendIdAndDelete">
        mdi-trash-can-outline
      </v-icon>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import ImageryService from '../services/ImageryService'

export default {
  name: 'ImageryCard',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    imagery: Object
  },
  computed: {
    ...mapGetters('users', ['loggedIn'])
  },
  methods: {
    async sendIdAndDelete() {
      const id = this.imagery._id
      const imageId = this.imagery.image.id
      await ImageryService.deleteImagery({ _id: id, image_id: imageId })
    },
    goToEdit() {
      const id = this.imagery._id
      this.$router.push('/users/imageries/edit/' + id)
    }
  }
}
</script>
