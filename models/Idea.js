const mongoose = require('mongoose')

const IdeaSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
    },
    username: {
      type: String,
    },
    rate: {
      type: Number,
      min: 1,
      max: 10,
    },
    point: Number,
    remark: String,
    ext: {
      type: Object,
    },
    isFamous: {
      type: Boolean,
      default: false,
    },
    role: String,
    date: {
      type: Date,
      default: Date.now,
    },
    usedBy: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
)

// virtual property
IdeaSchema.virtual('desc').get(function () {
return this.text.substring(0, 20)
})

// Dcoument middleware: runs before .save() and .create()
// IdeaSchema.pre('save', function (next) {
//   // this points to current document
//   // this.point = this.rate * 10;
//   next()
// })
// add index when need to query that field frequently for better performance
IdeaSchema.index({rate: 1})

IdeaSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'idea',
  localField: '_id',
})

// Query Middleware
IdeaSchema.pre('find', function (next) {
  // this.find({ isFamous: true });
  next()
})

module.exports = mongoose.model('Idea', IdeaSchema)
