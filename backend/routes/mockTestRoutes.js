const express = require('express');
const router = express.Router();
const { startTest, submitTest, getResults, getResultDetail } = require('../controllers/mockTestController');
const protect = require('../middleware/auth');

router.get('/start', protect, startTest);
router.post('/submit', protect, submitTest);
router.get('/results', protect, getResults);
router.get('/results/:id', protect, getResultDetail);

module.exports = router;
