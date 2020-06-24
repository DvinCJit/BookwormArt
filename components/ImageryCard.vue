<template>
  <v-card>
    <v-card-subtitle>Created by {{ imagery._nickname }}</v-card-subtitle>
    <v-card-title class="headline">
      {{ imagery.book }} by {{ imagery.author }}
    </v-card-title>
    <v-card-subtitle>{{ imagery.chapter }}</v-card-subtitle>
    <a :href="imagery.image.url"><img :src="imagery.image.url" width="100%" /></a>
    <v-card-text>
      <hr class="my-3" />
      <p v-if="this.$vuetify.theme.dark" class="text-justify">{{ imagery.fragment }}</p>
      <p v-else class="grey--text text--darken-4 text-justify">{{ imagery.fragment }}</p>
      <div v-if="loggedIn">
        <span :likes="likes" style="float: left" class="mr-1">{{
          likes
        }}</span>
        <p v-if="likes === 1">like</p>
        <p v-else>likes</p>
      </div>
    </v-card-text>
    <v-card-actions v-if="!loggedIn">
      <v-icon
        color="#069688"
        class="mr-4"
        :disabled="disabled"
        @mouseup.prevent="pushLogin"
        @click.prevent="disable"
      >
        {{ heartOutline }}
      </v-icon>
    </v-card-actions>
    
    <v-card-actions v-if="loggedIn">
      <v-icon
        color="#069688"
        class="mr-4"
        :disabled="disabled"
        @mouseup.prevent="updatingLikes"
        @click.prevent="disable"
      >
        {{ heartOutline }}
      </v-icon>

      <v-icon v-if="this.$route.params.id" color="#069688" class="mr-4" @click.prevent="goToEdit">
        mdi-pencil-outline
      </v-icon>
      <v-icon v-if="this.$route.params.id" color="#069688" @click.prevent="sendIdAndDelete">
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
  data() {
    return {
      heartOutline: 'mdi-heart-outline',
      disabled: false,
      likes: ''
    }
  },
  computed: {
    ...mapGetters('users', ['loggedIn']),
    ...mapGetters('users', ['userId'])
  },
  // Works before nuxt is loaded
  mounted() {
    if (this.loggedIn) {
      this.getLikes()
      this.countLikes()
    }
  },
  // Works when DOM is ready - when navigating through pages
  updated() {
    if (this.loggedIn) {
      this.getLikes()
      this.countLikes()
    }
  },
  methods: {
    getLikes() {
      const data = {
        _user: this.userId,
        _imagery: this.imagery._id
      }

      ImageryService.getUserLikes({ data })
        .then((response) => {
          if (response.data === true) {
            this.heartOutline = 'mdi-heart'
            this.$emit('update:heart', this.heartOutline)
          } else {
            this.heartOutline = 'mdi-heart-outline'
          }
        })
        .catch((err) => {
          return err
        })
    },
    countLikes() {
      const data = {
        _imagery: this.imagery._id
      }
      ImageryService.countImageryLikes({ data })
        .then((res) => {
          this.likes = res.data
        })
        .catch((err) => {
          return err
        })
    },
    async sendIdAndDelete() {
      const data = {
        _user: this.$store.state.users.user._id,
        image_id: this.imagery.image.id,
        _id: this.imagery._id
      }

      await ImageryService.deleteImagery({ data })
        .then(() => {
          location.reload()
        })
        .catch((err) => {
          return err
        })
    },
    goToEdit() {
      const id = this.imagery._id
      this.$router.push('/users/imageries/edit/' + id)
    },
    disable() {
      this.disabled = true
      setTimeout(() => (this.disabled = false), 4000)
    },
    updatingLikes() {
      const data = {
        _user: this.$store.state.users.user._id,
        _imagery: this.imagery._id
      }

      ImageryService.updateLikes({ data })
        .then((response) => {
          if (
            response.data.likes_count >
            parseInt(document.querySelector('#likes').textContent)
          ) {
            document.querySelector('#likes').textContent = 'Updated'
            this.heartOutline = 'mdi-heart'
            setTimeout()
          } else {
            document.querySelector('#likes').textContent = 'Updated'
            this.heartOutline = 'mdi-heart-outline'
          }
        })
        .catch((err) => {
          return err
        })
    },
    pushLogin() {
      this.$router.push('/register')
    }
  }
}
</script>
