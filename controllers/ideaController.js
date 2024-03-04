// idea controllers
const Idea = require('../models/idea')
const { wrapResponse } = require('../utils')
const { catchAsync } = require('../utils')
const AppError = require('../utils/AppError')
const factory = require('./handlerFactory')

exports.getIdeas = factory.getAll(Idea)
exports.getIdea = factory.getOne(Idea)
exports.createIdea = factory.addOne(Idea)
exports.updateIdea = factory.updateOne(Idea)
exports.deleteIdea = factory.deleteOne(Idea)