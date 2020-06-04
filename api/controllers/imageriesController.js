const secret = process.env.AUTH_SECRET
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const cloudinary = require('cloudinary')
const Imagery = require('../models/imagery.model')

// Get All
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

// Get Imagery
// module.exports.getImagery = async (req, res) => {
//   const { id } = req.params
//   await Imagery.findById(id)
//     .populate('user')
//     .then((err, imagery) => {
//       if (err) return err
//       // eslint-disable-next-line no-console
//       console.log('Imageries created by %s', imagery.owner.nickname)
//       res.json(imagery)
//     })
//     .catch((err) => res.status(404).json('Error: ' + err))
// }

// Get User Imageries
module.exports.getUserImageries = async (req, res) => {
  const { id } = req.params
  const query = {}
  query._creator = id
  await Imagery.find(query)
    .then((imageries) => {
      // if (imageries.length === 0 || imageries === null) {
      //   res.status(200).json('No imageries yet.')
      // }
      res.json(imageries)
    })
    .catch((err) => res.status(400).json('Error: ' + err))
}

// Create
module.exports.create = [
  // Validation rules
  check('book', 'Book title is required.').isLength({ min: 2 }),
  check('author', 'Book author is required.').isLength({ min: 2 }),
  check('fragment', 'Book fragment is required.').isLength({ min: 2 }),
  check('image', 'Imagery is required.'),
  // Initialize imagery
  (req, res) => {
    // console.log(req.file) // cloudinary image
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() })
    }
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

    const newImagery = new Imagery({
      book,
      author,
      chapter,
      fragment,
      url,
      image,
      likes_count: 0,
      _creator: id
    })

    newImagery
      .save()
      .then((imagery) => res.json(imagery))
      .catch((err) => res.status(400).json('Error saving record: ' + err))

    // newImagery.populate('_creator').execPopulate()
  }
]

module.exports.update = async (req, res) => {
  const id = req.params.id
  // eslint-disable-next-line no-console
  // console.log('Image file: ', req.file)
  await Imagery.findById(id)
    .then((imagery) => {
      // if (req.file.public_id) {
      //   cloudinary.v2.uploader.destroy(imagery.image.id, (error, result) => {
      //     if (error) return error
      //     res.json(result)
      //   })
      // }

      // const image = {}
      // image.url = req.file.url
      // image.id = req.file.public_id

      imagery.book = req.body.book
      imagery.author = req.body.author
      imagery.chapter = req.body.chapter
      imagery.fragment = req.body.fragment
      imagery.url = req.body.url
      // imagery.image = image

      imagery
        .save()
        .then(() => res.json('Imagery updated!'))
        .catch((err) => res.status(400).json('Error: ' + err))
    })
    .catch((err) => res.status(400).json('Error ' + err))
}

module.exports.delete = (req, res) => {
  const id = req.body._id
  const imageId = req.body.image_id
  // eslint-disable-next-line no-console
  console.log(imageId)
  cloudinary.v2.uploader.destroy(imageId, (error, result) => {
    if (error) return error
    res.json(result)
  })

  Imagery.findByIdAndDelete(id)
    .then(() => res.json('Imagery deleted.'))
    .catch((err) => res.status(400).json('Error: ' + err))
}
