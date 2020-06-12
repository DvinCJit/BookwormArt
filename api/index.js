const express = require('express')
const cors = require('cors')
const app = express()
// eslint-disable-next-line no-unused-vars
const db = require('./db')

app.use(cors())
// Initialize body-parser options (built-in with express)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Initialize API routes
const imageriesRouter = require('./routes/imageriesRoutes.js')
const usersRouter = require('./routes/usersRoutes.js')

app.use(imageriesRouter)
app.use(usersRouter)

// Export server middleware
module.exports = {
  path: '/api',
  handler: app
}
