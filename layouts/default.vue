<template>
  <v-app dark>
    <nav-bar />
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import NavBar from '~/components/NavBar.vue'

export default {
  components: {
    NavBar
  },
  head() {
    return {
      title: 'BookwormArt - The Only Art Community for Literature Lovers',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'BookwormArt is the only online social community for artists who get inspired through literary imagery and literature in general, making it possible for people to share their art and our literary legacy (from places such as Project Gutenberg which offer free public domain books).'
        }
      ]
    }
  }
}
</script>
