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
});

module.exports = mongoose.model('Idea', IdeaSchema);