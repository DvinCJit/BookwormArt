const router = require('express').Router()
const parser = require('../cloudinaryConfig')

// Initialize Controller
const imageriesController = require('../controllers/imageriesController')

// Get All
router.get('/imageries', imageriesController.list)

// Get One
router.get('/imageries/:id', imageriesController.find)

// Create
// Add cloudinary parser as middleware
router.post('/imageries', parser.single('image'), imageriesController.create)

// Update
router.put('/imageries/:id', imageriesController.update)

// Delete
router.delete('/imageries/:id', imageriesController.delete)

module.exports = router
