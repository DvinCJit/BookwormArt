/* eslint-disable no-console */
<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <h1>Create New Imagery</h1>
      <v-form
        v-model="formValidity"
        action=""
        method="post"
        enctype="multipart/form-data"
        @submit.prevent="submitImagery"
      >
        <v-text-field
          id="book"
          v-model="book"
          label="Book*"
          type="text"
          placeholder="Add book title"
          :rules="bookRules"
          required
        ></v-text-field>
        <v-text-field
          id="author"
          v-model="author"
          label="Author*"
          type="text"
          placeholder="Add book author"
          :rules="authorRules"
          required
        ></v-text-field>
        <v-text-field
          id="chapter"
          v-model="chapter"
          label="Chapter"
          type="text"
          :rules="chapterRules"
          placeholder="Add book chapter"
        ></v-text-field>
        <v-textarea
          id="fragment"
          v-model="fragment"
          label="Fragment*"
          type="text"
          placeholder="Add book fragment"
          :rules="fragmentRules"
          required
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
          required
        ></v-file-input>
        <v-btn
          id="submit"
          type="submit"
          color="#069688"
          class="black--text"
          :disabled="!formValidity"
          >Submit</v-btn
        >
      </v-form>
      <ul>
        <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
      </ul>
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
      image: {},
      errors: null,
      bookRules: [
        (value) => !!value || 'Book title is required.',
        (value) =>
          value.length >= 2 ||
          'Book title is too short, it must have 2 characters at least.',
        (value) =>
          value.length <= 30 ||
          "Book title is too long, it can't have more than 30 characters."
      ],
      authorRules: [
        (value) => !!value || 'Book author is required.',
        (value) =>
          value.length >= 2 ||
          'Book author is too short, it must have 2 characters at least.',
        (value) =>
          value.length <= 30 ||
          "Book author is too long, it can't have more than 30 characters."
      ],
      chapterRules: [
        (value) => !!value || 'Book chapter is required.',
        (value) =>
          value.length >= 2 ||
          'Book chapter is too short, it must have 2 characters at least.',
        (value) =>
          value.length <= 50 ||
          "Book chapter is too long, it can't have more than 50 characters."
      ],
      fragmentRules: [
        (value) => !!value || 'Book fragment is required.',
        (value) =>
          value.length >= 2 ||
          'Book fragment is too short, it must have 2 characters at least.',
        (value) =>
          value.length <= 500 ||
          "Book fragment is too long, it can't have more than 500 characters."
      ],
      formValidity: false
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

      ImageryService.addImagery(formData)
        .then((response) => {
          if (response.status === 200) {
            location.reload()
          }
        })
        .catch((err) => {
          this.errors = err.response.data.errors
        })
    }
  },
  middleware: ['auth']
}
</script>
