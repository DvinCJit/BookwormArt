<template>
  <div>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-icon id="book-icon">mdi-book-open-variant</v-icon>
      <v-toolbar-title id="toolbar-title" v-text="title" />
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      :right="right"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      right: true,
      items: [
        {
          icon: 'mdi-login',
          title: 'Login',
          to: '/login'
        },
        {
          icon: 'mdi-apps',
          title: 'Imagery List',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Create New Imagery',
          to: '/create'
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

#book-icon
  color: $title-color
  padding-right: 0.3em
</style>
