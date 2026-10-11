const express = require('express');
const router = express.Router();
const {
  getUsers,
  deleteUser,
  updateUserRole,
  getAllQuestions,
  deleteQuestion,
} = require('../controllers/adminController');
const protect = require('../middleware/auth');
const adminOnly = require('../middleware/admin');

router.use(protect, adminOnly);

router.get('/users', getUsers);
router.delete('/users/:id', deleteUser);
router.put('/users/:id/role', updateUserRole);
router.get('/questions', getAllQuestions);
router.delete('/questions/:id', deleteQuestion);

module.exports = router;
