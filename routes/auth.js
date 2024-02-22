const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

router.post('/signup', async (req, res) => {
  const { username, password } = req.body
  const hashedPwd = await bcrypt.hash(password, 10)
  try {
    const user = new User({ username, password: hashedPwd })
    await user.save()
    res.status(201).json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post('/login', async (req, res) => {
  const { username, password } = req.body

  // 1. 检查用户名是否存在
  const user = await User.findOne({ username })
  if (!user) {
    return res.status(404).json({ error: '用户名不存在' })
  }

  // 2. 检查密码是否正确
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    return res.status(400).json({ error: '密码错误' })
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  })
  res.status(200).json({ token })
})

module.exports = router
