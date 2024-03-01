// reviews route
const express = require('express');
const router = express.Router();

const reviewController = require('../controllers/reviewController');

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(reviewController.createReview)

router
  .route('/:id')
  .get(reviewController.getReviewById)
  .put(reviewController.updateReview)
  .delete(reviewController.deleteReview);

module.exports = router;