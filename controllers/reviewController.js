// review Controller
const Review = require('../models/Review')
const { catchAsync } = require('../utils')

exports.getAllReviews = catchAsync(async (req, res) => {
  const reviews = await Review.find({})
  res.status(200).json(reviews)
})

exports.createReview = catchAsync(async (req, res) => {
  const newReview = new Review(req.body)
  await newReview.save()
  res.status(201).json(newReview)
})

exports.getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
    if (!review) {
      return res.status(404).json({ message: 'Review not found' })
    }
    res.status(200).json(review)
  } catch (error) {
    res.status(500).json({ message: 'Failed to get review' })
  }
}

exports.updateReview = catchAsync(async (req, res) => {
  const { title, content, rating } = req.body
  const review = await Review.findByIdAndUpdate(req.params.id, {
    title,
    content,
    rating,
  })
  if (!review) {
    return next(new AppError('No Review found with that ID', 404))
  }
  res.status(200).json({ code: 200, data: review })
})

exports.deleteReview = async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'Review deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete review' })
  }
}
