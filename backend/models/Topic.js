const mongoose = require('mongoose');

const subtopicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  leetcodeLink: {
    type: String,
    default: ''
  },
  youtubeLink: {
    type: String,
    default: ''
  },
  articleLink: {
    type: String,
    default: ''
  },
  level: {
    type: String,
    enum: ['EASY', 'MEDIUM', 'HARD'],
    default: 'EASY'
  }
});

const topicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  subtopics: [subtopicSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Topic', topicSchema);
