const mongoose = require('mongoose');

const IdeaSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
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
  date: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  },
});

// virtual property
IdeaSchema.virtual('desc').get(function () {
  return this.text.substring(0, 20);
});

module.exports = mongoose.model('Idea', IdeaSchema);