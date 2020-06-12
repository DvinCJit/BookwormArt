const router = require('express').Router()

// Initialize Controller
const usersController = require('../controllers/usersController')

// Register
router.post('/register', usersController.register)

// Login
router.post('/login', usersController.login)

module.exports = router
