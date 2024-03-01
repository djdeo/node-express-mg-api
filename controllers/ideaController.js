// idea controllers
const Idea = require('../models/idea')
const { wrapResponse } = require('../utils')
const { catchAsync } = require('../utils')
const AppError = require('../utils/AppError')
// get all ideas
exports.getIdeas = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit
    const ideas = await Idea.find().skip(skip).limit(limit).select('-__v').sort({ date: -1 })
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
}

// create new idea
exports.createIdea = async (req, res) => {
  const idea = new Idea(req.body)
  try {
    const newIdea = await idea.save()
    res.status(201).json({ code: 201, data: newIdea })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({ code: 500, message: error.message })
  }
}

// get idea by id
exports.getIdea = async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id).populate({
      path: 'usedBy',
      select: '-__v -updatedAt',
    })
    res.json({
      code: 200,
      data: idea,
      message: 'message',
    })
  } catch (error) {
    res.status(500).json({ code: 500, message: 'Internal Server Error' })
  }
}

// put idea by id
exports.updateIdea = catchAsync(async (req, res) => {
  const idea = await Idea.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
  if (!idea) {
    return next(new AppError('No document found with that ID', 404))
  }
  res.status(200).json({ code: 200, data: idea })
})

// delete idea by id
exports.deleteIdea = catchAsync(async (req, res, next) => {
  const idea = await Idea.findByIdAndDelete(req.params.id)
    res.json({ code: 200, message: 'deleted' })
})

// update many ideas with new property
exports.updateManyIdeas = async (req, res) => {
  try {
    const ideas = await Idea.updateMany(
      {},
      [
        {
          $set: {
            // point: { $floor: { $multiply: [{ $rand: {} }, 100] } },
            // rate: {
            //   $floor: { $multiply: [{ $rand: {} }, 10] },
            // },
            role: 'admin'
          },
        },
      ],
      { upsert: true }
    )
    res.json({ code: 200, data: ideas })
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message })
  }
}
