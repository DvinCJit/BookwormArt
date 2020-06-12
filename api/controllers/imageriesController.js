const secret = process.env.AUTH_SECRET
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const cloudinary = require('cloudinary')
const Imagery = require('../models/imagery.model')
const Likes = require('../models/likes.model')

// Get All Imageries
module.exports.list = (req, res) => {
  Imagery.find()
    .then((imageries) => res.json(imageries))
    .catch((err) => res.status(400).json('Error: ' + err))
}

// Get One Imagery
module.exports.findImagery = async (req, res) => {
  const { id } = req.params
  await Imagery.findById(id)
    .then((imagery) => res.json(imagery))
    .catch((err) => res.status(404).json('Error ' + err))
}

// Get User Imageries
module.exports.getUserImageries = async (req, res) => {
  const { id } = req.params
  const query = {}
  query._creator = id
  await Imagery.find(query)
    .then((imageries) => {
      res.json(imageries)
    })
    .catch((err) => res.status(401).json('Error: ' + err))
}

// Create New Imagery
module.exports.create = [
  // Validation rules
  check('book', 'Book title is required.').isLength({ min: 2 }),
  check('author', 'Book author is required.').isLength({ min: 2 }),
  check('fragment', 'Book fragment is required.').isLength({ min: 2 }),
  check('image', 'Imagery is required.'),
  (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() })
    }

    // Initialize imagery and decode token
    const image = {}
    image.url = req.file.url
    image.id = req.file.public_id
    const book = req.body.book
    const author = req.body.author
    const chapter = req.body.chapter
    const fragment = req.body.fragment
    const url = req.body.url
    const token = req.headers.authorization.replace('Bearer ', '')
    const decoded = jwt.verify(token, secret)
    const id = decoded.user._id
    const name = decoded.user.nickname

    const newImagery = new Imagery({
      book,
      author,
      chapter,
      fragment,
      url,
      image,
      likes_count: 0,
      _creator: id,
      _nickname: name
    })

    newImagery
      .save()
      .then((imagery) => res.json(imagery))
      .catch((err) => res.status(400).json('Error saving record: ' + err))
  }
]

// Edit Imagery
module.exports.update = [
  // Validation rules
  check('book', 'Book title is required.').isLength({ min: 2 }),
  check('author', 'Book author is required.').isLength({ min: 2 }),
  check('fragment', 'Book fragment is required.').isLength({ min: 2 }),
  check('image', 'Imagery is required.'),
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() })
    }

    // Initialize imagery
    const id = req.params.id

    await Imagery.findById(id)
      .then((imagery) => {
        imagery.book = req.body.book
        imagery.author = req.body.author
        imagery.chapter = req.body.chapter
        imagery.fragment = req.body.fragment
        imagery.url = req.body.url

        imagery
          .save()
          .then(() => res.json('Imagery updated!'))
          .catch((err) => res.status(400).json('Error: ' + err))
      })
      .catch((err) => res.status(400).json('Error ' + err))
  }
]

// Delete imagery, likes and image
module.exports.delete = async (req, res) => {
  const _imagery = req.body._id
  const imageId = req.body.image_id
  const _user = req.body._user
  const userQuery = {}
  userQuery._user = _user
  const imageryQuery = {}
  imageryQuery._imagery = _imagery

  await Imagery.findByIdAndDelete(_imagery)
    .then(() => {
      Likes.findOneAndDelete({ $and: [userQuery, imageryQuery] }).then(() => {
        cloudinary.v2.uploader.destroy(imageId, (error, result) => {
          if (error) return error
          return res.json(result)
        })
      })
    })
    .catch((err) => res.status(400).json('Error: ' + err))
}

// Create new like if nonexistent or delete it if it exists
module.exports.updateLikes = async (req, res) => {
  const _user = req.body.data._user
  const _imagery = req.body.data._imagery
  const userQuery = {}
  userQuery._user = _user
  const imageryQuery = {}
  imageryQuery._imagery = _imagery

  await Likes.exists({ $and: [userQuery, imageryQuery] })
    .then((like) => {
      if (!like) {
        const newLike = new Likes({
          _imagery,
          _user
        })

        newLike
          .save()
          .then(() => res.json('Like added!'))
          .catch((err) => res.status(400).json('Error ' + err))
      } else {
        Likes.findOneAndDelete({ $and: [userQuery, imageryQuery] })
          .then(() => res.json('Like deleted!'))
          .catch((err) => res.status(400).json('Error ' + err))
      }
    })
    .catch((err) => res.status(400).json('Error ' + err))
}

// Find User Likes - returns a boolean
module.exports.findUserLikes = (req, res) => {
  const _user = req.body._user
  const _imagery = req.body._imagery
  const userQuery = {}
  userQuery._user = _user
  const imageryQuery = {}
  imageryQuery._imagery = _imagery

  Likes.exists({ $and: [userQuery, imageryQuery] }).then((userLikes) => {
    if (userLikes) {
      res.json(userLikes)
    } else {
      res.json(userLikes)
    }
  })
}

// Update Likes Count
module.exports.updateCount = (req, res) => {
  const _imagery = req.body._imagery
  const imageryQuery = {}
  imageryQuery._imagery = _imagery

  Likes.countDocuments(imageryQuery, (err, count) => {
    if (err) {
      return err
    }

    return res.json(count)
  })
}
