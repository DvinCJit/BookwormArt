/* eslint-disable no-console */
<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <h1>Create New Imagery</h1>
      <v-form
        action=""
        method="post"
        enctype="multipart/form-data"
        @submit.prevent="submitImagery"
      >
        <v-text-field
          id="book"
          v-model="book"
          label="Book"
          type="text"
          placeholder="Add book title"
        ></v-text-field>
        <v-text-field
          id="author"
          v-model="author"
          label="Author"
          type="text"
          placeholder="Add book author"
        ></v-text-field>
        <v-text-field
          id="chapter"
          v-model="chapter"
          label="Chapter"
          type="text"
          placeholder="Add book chapter"
        ></v-text-field>
        <v-textarea
          id="fragment"
          v-model="fragment"
          label="Fragment"
          type="text"
          placeholder="Add book fragment"
        ></v-textarea>
        <v-text-field
          id="url"
          v-model="url"
          label="Link to book"
          type="text"
          placeholder="http://www.gutenberg.org/files/514/514-h/514-h.htm"
        ></v-text-field>
        <v-file-input
          id="image"
          v-model="image"
          placeholder="Attach imagery picture"
        ></v-file-input>
        <v-btn
          id="submit"
          type="submit"
          color="lime accent-3"
          class="black--text"
          >Submit</v-btn
        >
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
import ImageryService from '@/services/ImageryService.js'

export default {
  data() {
    return {
      book: '',
      author: '',
      chapter: '',
      fragment: '',
      url: '',
      image: {}
    }
  },
  methods: {
    submitImagery() {
      const formData = new FormData()
      formData.append('book', this.book)
      formData.append('author', this.author)
      formData.append('chapter', this.chapter)
      formData.append('fragment', this.fragment)
      formData.append('url', this.url)
      formData.append('image', this.image)
      // eslint-disable-next-line no-console
      // console.log(formData)
      ImageryService.addImagery(formData)
        .then((response) => {
          // eslint-disable-next-line no-console
          // console.log(response)
          // eslint-disable-next-line no-console
          if (response.status === 200) {
            this.$router.push('/')
          }
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err.response)
        })
    }
  }
}
</script>
