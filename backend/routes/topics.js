const express = require('express');
const router = express.Router();
const { getTopics, getTopic } = require('../controllers/topicController');

router.get('/', getTopics);
router.get('/:id', getTopic);

module.exports = router;
