const secret = process.env.AUTH_SECRET
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const User = require('../models/user.model')

module.exports.register = [
  // Validation rules
  check('nickname', 'Nickname is required')
    .isLength({ min: 2 })
    .trim(),
  check('password', 'Password is required')
    .isLength({ min: 5 })
    .trim(),
  check('email', 'Email is required')
    .isEmail()
    .trim()
    .custom((value) => {
      return User.findOne({ email: value }).then((user) => {
        if (user) {
          // eslint-disable-next-line prefer-promise-reject-errors
          return Promise.reject('Email already in use')
        }
      })
    }),

  // Request / response
  (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() })
    }

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
]

module.exports.login = [
  // Validation rules
  check('email', 'Email is required').isEmail(),
  check('password', 'Password is required').isLength([{ min: 5 }]),
  // Request / response
  (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() })
    }
    const email = req.body.email
    const password = req.body.password

    User.findOne({ email }, (err, user) => {
      if (err) {
        return res.status(500).json('Error logging in: ' + err)
      }

      if (!user) {
        return res.status(500).json('Invalid login. Please try again.')
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
]

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
