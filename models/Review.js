const { mongoose } = require('mongoose')

// Review Modal
const Review = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review can not be empty!'],
    },
    rating: {
      type: Number,
      required: [true, 'Review must have a rating!'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    idea: {
      type: mongoose.Schema.ObjectId,
      ref: 'Idea',
      required: [true, 'Review must belong to an Idea.'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a User.'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

Review.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'username',
  })
  next()
})

module.exports = mongoose.model('Review', Review)
