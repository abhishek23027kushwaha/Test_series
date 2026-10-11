const express = require('express');
const router = express.Router();
const { getSubjects, createSubject } = require('../controllers/subjectController');
const protect = require('../middleware/auth');
const adminOnly = require('../middleware/admin');

router.get('/', getSubjects);
router.post('/', protect, adminOnly, createSubject);

module.exports = router;
