const mongoose = require('mongoose')
const Schema = mongoose.Schema

const likesSchema = new Schema({
  _imagery: { type: Schema.Types.ObjectId },
  _user: { type: Schema.Types.ObjectId, ref: 'User' }
})

const Likes = mongoose.model('Likes', likesSchema)

module.exports = Likes
