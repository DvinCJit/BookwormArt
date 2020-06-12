<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <h1 class="text-center">Edit Imagery</h1>
      <div class="text-center">
        <img :src="imagery.image.url" width="30%" class="mt-4 mb-4" />
      </div>
      <v-form
        v-model="formValidity"
        method="post"
        enctype="multipart/form-data"
        @submit.prevent="editImagery"
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
        <v-btn
          id="Cancel"
          type="submit"
          color="#069688"
          class="mr-4 black--text"
          >Cancel</v-btn
        >
        <v-btn
          id="submit"
          type="submit"
          color="#069688"
          class="black--text"
          :disabled="!formValidity"
          >Edit</v-btn
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
  async asyncData({ params }) {
    const { data } = await ImageryService.getImagery(params.id)
    return {
      imagery: data
    }
  },
  data() {
    return {
      book: '',
      author: '',
      chapter: '',
      fragment: '',
      url: '',
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
  mounted() {
    this.fillForm()
  },
  methods: {
    fillForm() {
      this.book = this.imagery.book
      this.author = this.imagery.author
      this.chapter = this.imagery.chapter
      this.fragment = this.imagery.fragment
      this.url = this.imagery.url
    },
    editImagery() {
      const id = this.imagery._id
      const data = {
        book: this.book,
        author: this.author,
        chapter: this.chapter,
        fragment: this.fragment,
        url: this.url
      }

      ImageryService.updateImagery({ id, data })
        .then((response) => {
          if (response.status === 200) {
            this.$router.push('/')
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
