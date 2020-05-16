<template>
  <v-app dark>
    <v-app-bar fixed app>
      <v-toolbar-title id="toolbar-title" v-text="title" />
      <v-spacer></v-spacer>
      <v-btn>Sign in</v-btn>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: true,
      title: 'BookwormArt'
    }
  }
}
</script>

<style lang="sass" scoped>
#toolbar-title
  color: $title-color
  font-family: $font-family-title
  font-size: $font-size-title

#logo
  color: $title-color
  font-size: 20px
</style>
