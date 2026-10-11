const express = require('express');
const router = express.Router();
const {
  getQuestions,
  getQuestion,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  toggleSolved,
} = require('../controllers/questionController');
const protect = require('../middleware/auth');

router.get('/', protect, getQuestions);
router.get('/:id', protect, getQuestion);
router.post('/', protect, createQuestion);
router.put('/:id', protect, updateQuestion);
router.delete('/:id', protect, deleteQuestion);
router.put('/:id/solve', protect, toggleSolved);

module.exports = router;
