const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

router.post('/signup', async (req, res) => {
  const { username, password } = req.body
  const hashedPwd = await bcrypt.hash(password, 10)
  try {
    const user = new User({...req.body, password: hashedPwd})
    await user.save()
    res.status(201).json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post('/login', async (req, res) => {
  const { username, password } = req.body

  // 1. check user
  const user = await User.findOne({ username }).select('+password');
  if (!user) {
    return res.status(404).json({ error: 'No such User, please try to signup' })
  }
  // 2. check password
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    return res.status(400).json({ error: 'Sorry, wrong password' })
  }

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  })
  res.status(200).json({ token })
})

module.exports = router
