// idea controllers
const Idea = require('../models/idea');
const { wrapResponse } = require('../utils');

// get all ideas
exports.getIdeas = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit
    const ideas = await Idea.find().skip(skip).limit(limit).select('-__v')
    res.json(
      wrapResponse(
        200,
        {
          total: await Idea.countDocuments(),
          page,
          pageSize: limit,
          items: ideas,
        },
        'Get ideas successfully'
      )
    )
  } catch (error) {
    res.status(500).json({ code: 500, message: 'Internal Server Error' })
  }
};

// create new idea
exports.createIdea = async (req, res) => {
  const { username, tag, text } = req.body
  const idea = new Idea({ text, tag, username })
  try {
    const newIdea = await idea.save()
    res.status(201).json({ code: 201, data: newIdea })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({ code: 500, message: error.message })
  }
};

// get idea by id
exports.getIdea = async (req, res) => {
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
};

// put idea by id
exports.updateIdea = async (req, res) => {
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
}

// delete idea by id
exports.deleteIdea = async (req, res) => {
  try {
    const idea = await Idea.findByIdAndDelete(req.params.id)
    res.json({ code: 200, message: 'deleted' })
  } catch (error) {
    res.status(500).json({ code: 500, message: 'Internal Server Error' })
  }
}