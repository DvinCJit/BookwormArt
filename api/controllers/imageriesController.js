const secret = process.env.AUTH_SECRET
const jwt = require('jsonwebtoken')
const Imagery = require('../models/imagery.model')

// Get All
module.exports.list = (req, res) => {
  Imagery.find()
    .then((imageries) => res.json(imageries))
    .catch((err) => res.status(400).json('Error: ' + err))
}

// Get One
// module.exports.find = async (req, res) => {
//   const id = req.params.id
//   await Imagery.findById(id)
//     .then((imagery) => res.json(imagery))
//     .catch((err) => res.status(404).json('Error ' + err))
// }

// Get Imagery
module.exports.getImagery = async (req, res) => {
  const { id } = req.params
  await Imagery.findById(id)
    .populate('user')
    .then((err, imagery) => {
      if (err) return err
      // eslint-disable-next-line no-console
      console.log('Imageries created by %s', imagery.owner.nickname)
      res.json(imagery)
    })
    .catch((err) => res.status(404).json('Error: ' + err))
}

// Get User Imageries
module.exports.getUserImageries = async (req, res) => {
  const { id } = req.params
  const query = {}
  query._creator = id
  await Imagery.find(query)
    .then((imageries) => res.json(imageries))
    .catch((err) => res.status(400).json('Error: ' + err))
}

// Create
module.exports.create =
  // Validation rules
  // Initialize imagery
  (req, res) => {
    // console.log(req.file) // cloudinary image
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
      _creator: id
    })

    newImagery
      .save()
      .then((imagery) => res.json(imagery))
      .catch((err) => res.status(400).json('Error saving record: ' + err))

    // newImagery.populate('_creator').execPopulate()
  }

module.exports.update = (req, res) => {
  const id = req.params.id
  Imagery.findById(id)
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

module.exports.delete = (req, res) => {
  Imagery.findByIdAndDelete(req.params.id)
    .then(() => res.json('Imagery deleted.'))
    .catch((err) => res.status(400).json('Error: ' + err))
}
