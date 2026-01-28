const express = require('express');
const router = express.Router();
const { getProgress, updateProgress, getProgressStats, getRecentActivity } = require('../controllers/progressController');
const { protect } = require('../middleware/auth');

// All routes require authentication
router.use(protect);

router.get('/', getProgress);
router.post('/', updateProgress);
router.get('/stats', getProgressStats);
router.get('/recent', getRecentActivity);

module.exports = router;
