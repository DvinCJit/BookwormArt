const mongoose = require('mongoose')
const Schema = mongoose.Schema

const imagerySchema = new Schema(
  {
    book: { type: String, required: true, minlength: 3, maxlength: 100 },
    author: { type: String, required: true },
    chapter: { type: String, required: false, maxlength: 50 },
    fragment: { type: String, required: true, minlength: 5, maxlength: 1000 },
    url: { type: String, required: false },
    image: { type: Object },
    _creator: {
      type: Schema.Types.ObjectId
      // ref: 'User'
    }
  },
  {
    timestamps: true
  }
)

const Imagery = mongoose.model('Imagery', imagerySchema)

module.exports = Imagery
