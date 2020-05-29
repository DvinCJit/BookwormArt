const secret = process.env.AUTH_SECRET
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/user.model')

module.exports.register = (req, res) => {
  const user = {
    nickname: req.body.nickname,
    email: req.body.email,
    password: req.body.password
  }

  const nickname = req.body.nickname
  const email = req.body.email
  const password = req.body.password
  const token = jwt.sign(user, secret)

  const newUser = new User({
    nickname,
    email,
    password,
    token
  })

  newUser
    .save()
    .then(() => res.json({ token, nickname, email }))
    .catch((err) => res.status(400).json('Error saving user: ' + err))
}

module.exports.login = (req, res) => {
  const email = req.body.email
  const password = req.body.password

  User.findOne({ email }, (err, user) => {
    if (err) {
      return res.status(500).json('Error logging in: ' + err)
    }

    if (!user) {
      return res.status(500).json('Invalid email or password.')
    }

    const token = jwt.sign({ user }, secret)
    bcrypt.compare(password, user.password, (err, isPasswordMatch) => {
      if (err) {
        return res.status(500).json('Error logging in: ' + err)
      }

      if (isPasswordMatch) {
        return res.json({
          token,
          _id: user._id,
          nickname: user.nickname,
          email: user.email
        })
      }

      if (!isPasswordMatch) {
        return res.status(500).json('Invalid email or password.')
      }
    })
  })
}

// Get User Imageries
// module.exports.getUserImageries = async (req, res) => {
//   const { id } = req.params
//   await User.findById(id)
//     .populate('imageries')
//     .execPopulate()
//     .then((user) => {
//       // eslint-disable-next-line no-console
//       console.log('The user has % imageries ', user.imageries.length)
//       res.json(user)
//     })
//     .catch((err) => res.status(404).json('Error: ' + err))
// }
