const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  topicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic',
    required: true
  },
  subtopicIndex: {
    type: Number,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Date
  }
});

// Compound index to ensure unique progress entries per user/topic/subtopic
progressSchema.index({ userId: 1, topicId: 1, subtopicIndex: 1 }, { unique: true });

module.exports = mongoose.model('Progress', progressSchema);
