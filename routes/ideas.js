const express = require('express')
const router = express.Router()

const authen = require('../middleware/authen')

const { wrapResponse } = require('../utils')
const ideaController = require('../controllers/ideaController')

// use authen middleware
router.use(authen)
// router with controllers
router
  .route('/')
  .get(ideaController.getIdeas)
  .post(ideaController.createIdea)

router
  .route('/update')
  .post(ideaController.updateManyIdeas)

router
  .route('/:id')
  .get(ideaController.getIdea)
  .put(ideaController.updateIdea)
  .delete(ideaController.deleteIdea)

module.exports = router
