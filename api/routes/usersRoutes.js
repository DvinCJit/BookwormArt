const router = require('express').Router()

// Initialize Controller
const usersController = require('../controllers/usersController')

// Register
router.post('/register', usersController.register)

// Login
router.post('/login', usersController.login)

// Get all user imageries
// router.get('/users/:id', usersController.getUserImageries)

module.exports = router
