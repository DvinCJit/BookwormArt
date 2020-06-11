<template>
  <div>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-icon id="book-icon">mdi-book-open-variant</v-icon>
      <nuxt-link id="home-link" to="/">
        <v-toolbar-title id="toolbar-title" v-text="title" />
      </nuxt-link>
      <v-spacer></v-spacer>
      <div v-if="$vuetify.breakpoint.mdAndUp && loggedIn && this.$store.state.users.user._id">
        <nuxt-link to="/">
          <v-icon class="mr-3">mdi-home</v-icon>
        </nuxt-link>
        <nuxt-link to="/users/imageries/create">
          <v-icon class="mr-3">mdi-plus-circle</v-icon>
        </nuxt-link>
        <nuxt-link to="/users/:id">
          <v-icon class="mr-3">mdi-account-circle</v-icon>
        </nuxt-link>
      </div>
      <div v-if="$vuetify.breakpoint.mdAndUp && loggedIn && !this.$store.state.users.user._id">
        <nuxt-link>
          <v-btn color="#069688" class="black--text">Login</v-btn>
        </nuxt-link>
        <nuxt-link to="/register">
          <v-btn color="#069688" class="black--text">Register</v-btn>
        </nuxt-link>
      </div>
      <div v-if="$vuetify.breakpoint.mdAndUp && !loggedIn">
        <nuxt-link to="/login">
          <v-btn color="#069688" class="black--text">Login</v-btn>
        </nuxt-link>
        <nuxt-link to="/register">
          <v-btn  color="#069688" class="black--text">Register</v-btn>
        </nuxt-link>
      </div>
      <v-btn v-if="$vuetify.breakpoint.mdAndUp && loggedIn && this.$store.state.users.user._id" color="#069688" class="black--text" @click="logout">Logout</v-btn>
      <v-btn class="ml-1" @click="toggleTheme">Theme</v-btn>
      <v-app-bar-nav-icon v-if="$vuetify.breakpoint.smAndDown" @click.stop="drawer = !drawer" />
    </v-app-bar>
    <v-navigation-drawer
      v-if="$vuetify.breakpoint.smAndDown"
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      :right="right"
      fixed
      app
    >
      <v-list v-if="loggedIn && this.$store.state.users.user._id">
        <v-list-item
          v-for="(itemLogin, j) in itemsLogin"
          :key="j"
          :to="itemLogin.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ itemLogin.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="itemLogin.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list v-else-if="loggedIn && !this.$store.state.users.user._id">
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
      <v-list v-if="!loggedIn">
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
      <template v-if="loggedIn && this.$store.state.users.user._id">
        <div class="pa-2">
          <v-btn color="#069688" class="black--text" block @click="logout"
            >Logout</v-btn
          >
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
          icon: 'mdi-account-plus',
          title: 'Register',
          to: '/register'
        },
        {
          icon: 'mdi-home',
          title: 'Imagery List',
          to: '/'
        }
      ],
      itemsLogin: [
        {
          icon: 'mdi-home',
          title: 'Imagery List',
          to: '/'
        },
        {
          icon: 'mdi-plus-circle',
          title: 'Create New Imagery',
          to: '/users/imageries/create'
        },
        {
          icon: 'mdi-account-circle',
          title: 'Dashboard',
          to: '/users/:id'
        }
      ],
      miniVariant: false,
      title: 'BookwormArt'
    }
  },
  computed: {
    ...mapGetters('users', ['loggedIn'])
  },
  methods: {
    logout() {
      this.$store.dispatch('users/logout')
    },
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
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

#home-link, a
  text-decoration: none
</style>
