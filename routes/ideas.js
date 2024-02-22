const express = require('express')
const router = express.Router()

const Idea = require('../models/Idea')
const authen = require('../middleware/authen')
router.get('/', authen, async (req, res) => {
  try {
    const ideas = await Idea.find()
    res.json({
      code: 200,
      data: ideas,
      message: 'message',
    })
  } catch (error) {
    res.status(500).json({ code: 500, message: 'Internal Server Error' })
  }
})

// get idea by id
router.get('/:id', authen, async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id)
    res.json({
      code: 200,
      data: idea,
      message: 'message',
    })
  } catch (error) {
    res.status(500).json({ code: 500, message: 'Internal Server Error' })
  }
})

// Add an idea
router.post('/', authen, async (req, res) => {
  const { username, tag, text } = req.body
  const idea = new Idea({ text, tag, username })
  try {
    const newIdea = await idea.save()
    res.status(201).json({ code: 201, data: newIdea })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({ code: 500, message: error.message })
  }
})

router.put('/:id', authen, async (req, res) => {
  try {
    const updatedIdea = await Idea.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          text: req.body.text,
          tag: req.body.tag,
        },
      },
      { new: true }
    )
    res.json({ code: 200, data: updatedIdea })
  } catch (error) {
    res.status(500).json({ code: 500, message: 'Internal Server Error' })
  }
})

router.delete('/:id', authen, async (req, res) => {
  try {
    const idea = await Idea.findByIdAndDelete(req.params.id)
    res.json({ code: 200, message: 'deleted' })
  } catch (error) {
    res.status(500).json({ code: 500, message: 'Internal Server Error' })
  }
})

module.exports = router
