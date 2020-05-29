const mongoose = require('mongoose')
const uri = process.env.ATLAS_URI

require('dotenv').config()
mongoose.set('debug', true)
mongoose.connect(uri, {
  // To fix all deprecation warnings:
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})

const db = mongoose.connection
// eslint-disable-next-line no-console
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function callback() {
  // eslint-disable-next-line no-console
  console.log('MongoDB connection established successfully')
})

module.exports = db
