const router = require('express').Router()
const parser = require('../cloudinaryConfig')

// Initialize Controller
const imageriesController = require('../controllers/imageriesController')

// Get All
router.get('/imageries', imageriesController.list)

// Get One
// router.get('/users/imageries/:id', imageriesController.find)

// Get Imagery (substitutes above) not using it atm
router.get('/users/imageries/:id', imageriesController.getImagery)

// Get User Imageries
router.get('/users/:id', imageriesController.getUserImageries)

// Create
// Add cloudinary parser as middleware
router.post('/imageries', parser.single('image'), imageriesController.create)

// Update
router.put('/imageries/:id', imageriesController.update)

// Delete
router.delete('/imageries/:id', imageriesController.delete)

module.exports = router
