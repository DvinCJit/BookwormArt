const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
  nickname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  token: {
    type: String,
    required: true
  }
  // imageries: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: 'Imagery'
  //   }
  // ]
})

// Hash password before saving user
userSchema.pre('save', async function(next) {
  const user = this
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
