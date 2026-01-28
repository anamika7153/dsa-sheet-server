const Progress = require('../models/Progress');
const Topic = require('../models/Topic');

// @desc    Get user's progress
// @route   GET /api/progress
// @access  Private
exports.getProgress = async (req, res) => {
  try {
    const progress = await Progress.find({
      userId: req.user.id,
      completed: true
    });

    res.status(200).json({
      success: true,
      data: progress
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update subtopic completion status
// @route   POST /api/progress
// @access  Private
exports.updateProgress = async (req, res) => {
  try {
    const { topicId, subtopicIndex, completed } = req.body;

    // Validate topic exists
    const topic = await Topic.findById(topicId);
    if (!topic) {
      return res.status(404).json({
        success: false,
        message: 'Topic not found'
      });
    }

    // Validate subtopicIndex
    if (subtopicIndex < 0 || subtopicIndex >= topic.subtopics.length) {
      return res.status(400).json({
        success: false,
        message: 'Invalid subtopic index'
      });
    }

    // Find and update or create progress entry
    const progress = await Progress.findOneAndUpdate(
      {
        userId: req.user.id,
        topicId,
        subtopicIndex
      },
      {
        userId: req.user.id,
        topicId,
        subtopicIndex,
        completed,
        completedAt: completed ? new Date() : null
      },
      {
        new: true,
        upsert: true
      }
    );

    res.status(200).json({
      success: true,
      data: progress
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get progress statistics by level
// @route   GET /api/progress/stats
// @access  Private
exports.getProgressStats = async (req, res) => {
  try {
    // Get all topics with their subtopics
    const topics = await Topic.find();

    // Get user's completed progress
    const completedProgress = await Progress.find({
      userId: req.user.id,
      completed: true
    });

    // Create a set of completed items for quick lookup
    const completedSet = new Set(
      completedProgress.map(p => `${p.topicId}-${p.subtopicIndex}`)
    );

    // Count by level
    const stats = {
      easy: { total: 0, completed: 0 },
      medium: { total: 0, completed: 0 },
      hard: { total: 0, completed: 0 }
    };

    topics.forEach(topic => {
      topic.subtopics.forEach((subtopic, index) => {
        const level = subtopic.level.toLowerCase();
        if (stats[level]) {
          stats[level].total++;
          if (completedSet.has(`${topic._id}-${index}`)) {
            stats[level].completed++;
          }
        }
      });
    });

    // Calculate percentages and include counts
    const result = {
      easy: {
        percentage: stats.easy.total > 0
          ? Math.round((stats.easy.completed / stats.easy.total) * 100)
          : 0,
        completed: stats.easy.completed,
        total: stats.easy.total
      },
      medium: {
        percentage: stats.medium.total > 0
          ? Math.round((stats.medium.completed / stats.medium.total) * 100)
          : 0,
        completed: stats.medium.completed,
        total: stats.medium.total
      },
      hard: {
        percentage: stats.hard.total > 0
          ? Math.round((stats.hard.completed / stats.hard.total) * 100)
          : 0,
        completed: stats.hard.completed,
        total: stats.hard.total
      }
    };

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get recent activity
// @route   GET /api/progress/recent
// @access  Private
exports.getRecentActivity = async (req, res) => {
  try {
    // Get last 10 completed items
    const recentProgress = await Progress.find({
      userId: req.user.id,
      completed: true
    })
      .sort({ completedAt: -1 })
      .limit(10);

    // Get all topics for name lookup
    const topics = await Topic.find();
    const topicMap = new Map(topics.map(t => [t._id.toString(), t]));

    // Build response with topic and subtopic names
    const recentActivity = recentProgress.map(p => {
      const topic = topicMap.get(p.topicId.toString());
      return {
        id: p._id,
        topicName: topic ? topic.name : 'Unknown Topic',
        subtopicName: topic && topic.subtopics[p.subtopicIndex]
          ? topic.subtopics[p.subtopicIndex].name
          : 'Unknown Subtopic',
        level: topic && topic.subtopics[p.subtopicIndex]
          ? topic.subtopics[p.subtopicIndex].level
          : 'EASY',
        completedAt: p.completedAt
      };
    });

    res.status(200).json({
      success: true,
      data: recentActivity
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
