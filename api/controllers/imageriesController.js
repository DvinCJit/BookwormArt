const secret = process.env.AUTH_SECRET
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const cloudinary = require('cloudinary')
const Imagery = require('../models/imagery.model')
const Likes = require('../models/likes.model')

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
  // const token = req.headers.authorization.replace('Bearer ', '')
  // const decoded = jwt.verify(token, secret)
  // const id = decoded.user._id
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
    .catch((err) => res.status(401).json('Error: ' + err))
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

    // newImagery.populate('_creator').execPopulate()
  }
]

module.exports.update = [
  check('book', 'Book title is required.').isLength({ min: 2 }),
  check('author', 'Book author is required.').isLength({ min: 2 }),
  check('fragment', 'Book fragment is required.').isLength({ min: 2 }),
  check('image', 'Imagery is required.'),
  async (req, res) => {
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
]

module.exports.delete = async (req, res) => {
  const _imagery = req.body._id
  const imageId = req.body.image_id
  const _user = req.body._user
  const userQuery = {}
  userQuery._user = _user
  const imageryQuery = {}
  imageryQuery._imagery = _imagery
  // eslint-disable-next-line no-console
  console.log(imageId)
  // cloudinary.v2.uploader.destroy(imageId, (error, result) => {
  //   if (error) return error
  //   return res.json(result)
  // })

  // await Imagery.findByIdAndDelete(id, (err, docs) => {
  //   if (err) return err
  //   return res.json('Imagery deleted!')
  // })
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

module.exports.updateLikes = async (req, res) => {
  // eslint-disable-next-line no-console
  console.log(req.body)
  const _user = req.body.data._user
  const _imagery = req.body.data._imagery
  const userQuery = {}
  userQuery._user = _user
  const imageryQuery = {}
  imageryQuery._imagery = _imagery
  // eslint-disable-next-line no-console
  console.log('body: ', typeof req.body.data._user)
  //  - returns []{ imageryQuery, _users: { $in: [_user] } }
  await Likes.exists({ $and: [userQuery, imageryQuery] })
    .then((like) => {
      // eslint-disable-next-line no-console
      // console.log(imagery.likes_count)
      if (!like) {
        // eslint-disable-next-line no-console
        console.log('No like found...')
        const newLike = new Likes({
          _imagery,
          _user
        })

        newLike
          .save()
          .then(() => res.json('Like added!'))
          .catch((err) => res.status(400).json('Error ' + err))
      } else {
        // eslint-disable-next-line no-console
        console.log('like', like)
        Likes.findOneAndDelete({ $and: [userQuery, imageryQuery] })
          .then(() => res.json('Like deleted!'))
          .catch((err) => res.status(400).json('Error ' + err))
      }
    })
    .catch((err) => res.status(400).json('Error ' + err))
}

// module.exports.updateCount = async (req, res) => {
//   // eslint-disable-next-line no-console
//   console.log(req.body)
//   const _user = req.body.data._user
//   const _imagery = req.body.data._imagery
//   const userQuery = {}
//   userQuery._user = _user
//   const imageryQuery = {}
//   imageryQuery._imagery = _imagery

//   await Likes.findOneAndUpdate(imageryQuery, imageryQuery, {
//     upsert: true,
//     new: true
//   })
//     .then((like) => {
//       Likes.exists(userQuery).then((user) => {
//         if (!user) {
//           // eslint-disable-next-line no-console
//           console.log('No user...', like)
//           Likes.findOneAndUpdate(imageryQuery, userQuery, { new: true })
//             .then(() => {
//               Imagery.findByIdAndUpdate(
//                 _imagery,
//                 { $inc: { likes_count: 1 } },
//                 { new: true }
//               ).then((imagery) => res.json(imagery))
//             })
//             .catch((err) => res.status(400).json('Error ' + err))
//         } else {
//           // eslint-disable-next-line no-console
//           console.log('Like: ', like)
//           Likes.findOneAndUpdate(
//             imageryQuery,
//             { $pull: { _users: { $in: [_user] } } },
//             { new: true }
//           )
//             .then(() => {
//               Imagery.findByIdAndUpdate(
//                 _imagery,
//                 { $inc: { likes_count: -1 } },
//                 { new: true }
//               ).then((imagery) => res.json(imagery))
//             })
//             .catch((err) => res.status(400).json('Error ' + err))
//         }
//       })
//     })
//     .catch((err) => res.status(400).json('Error ' + err))
// }

module.exports.findUserLikes = (req, res) => {
  // eslint-disable-next-line no-console
  console.log('likes')
  // eslint-disable-next-line no-console
  console.log('data :', req.body)
  const _user = req.body._user
  const _imagery = req.body._imagery
  const userQuery = {}
  userQuery._user = _user
  const imageryQuery = {}
  imageryQuery._imagery = _imagery

  Likes.exists({ $and: [userQuery, imageryQuery] }).then((userLikes) => {
    if (userLikes) {
      // eslint-disable-next-line no-console
      console.log('likes: ', userLikes)
      res.json(userLikes)
    } else {
      // eslint-disable-next-line no-console
      console.log('no likes: ', userLikes)
      res.json(userLikes)
    }
  })
}

module.exports.updateCount = (req, res) => {
  const _imagery = req.body._imagery
  const imageryQuery = {}
  imageryQuery._imagery = _imagery

  Likes.countDocuments(imageryQuery, (err, count) => {
    if (err) {
      return err
      // res.status(400).json('Error ' + err)
    }
    // eslint-disable-next-line no-console
    console.log('count: ', count)
    // res.json(count)
    return res.json(count)
  })
}
