const express = require('express')
const cors = require('cors')
// eslint-disable-next-line no-unused-vars
const db = require('./db')

const app = express()

app.use(cors())
// Init body-parser options (built-in with express)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Require & Import API routes
// eslint-disable-next-line no-unused-vars
const imageriesRouter = require('./routes/imageriesRoutes.js')
// const usersRouter = require('./routes/usersRoutes.js')

app.use(imageriesRouter)
// app.use(usersRouter)

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
