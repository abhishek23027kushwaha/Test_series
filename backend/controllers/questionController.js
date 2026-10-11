const Question = require('../models/Question');

// @route GET /api/questions
exports.getQuestions = async (req, res) => {
  try {
    const { search, subject, difficulty, company } = req.query;
    const filter = {};
    if (subject) filter.subject = subject;
    if (difficulty) filter.difficulty = difficulty;
    if (company) filter.company = company;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } },
      ];
    }

    const questions = await Question.find(filter).sort({ createdAt: -1 }).lean();

    const withFlags = questions.map((q) => ({
      ...q,
      solvedByMe: req.user ? q.solvedBy.some((s) => String(s.user) === String(req.user._id)) : false,
    }));

    res.json(withFlags);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @route GET /api/questions/:id
exports.getQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ message: 'Question not found' });
    res.json(question);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @route POST /api/questions
exports.createQuestion = async (req, res) => {
  try {
    const { title, description, answer, subject, company, difficulty, tags, options, correctOption } = req.body;
    if (!title || !subject) {
      return res.status(400).json({ message: 'Title and subject are required' });
    }
    const cleanOptions = Array.isArray(options) ? options.map((o) => (o || '').trim()).filter(Boolean) : [];
    const question = await Question.create({
      title,
      description,
      answer,
      subject,
      company,
      difficulty,
      tags: Array.isArray(tags) ? tags : (tags || '').split(',').map((t) => t.trim()).filter(Boolean),
      options: cleanOptions.length === 4 ? cleanOptions : [],
      correctOption: cleanOptions.length === 4 && correctOption !== undefined && correctOption !== '' ? Number(correctOption) : null,
      createdBy: req.user._id,
    });
    res.status(201).json(question);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @route PUT /api/questions/:id
exports.updateQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ message: 'Question not found' });

    const isOwner = String(question.createdBy) === String(req.user._id);
    if (!isOwner && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to edit this question' });
    }

    const { title, description, answer, subject, company, difficulty, tags, options, correctOption } = req.body;
    if (title !== undefined) question.title = title;
    if (description !== undefined) question.description = description;
    if (answer !== undefined) question.answer = answer;
    if (subject !== undefined) question.subject = subject;
    if (company !== undefined) question.company = company;
    if (difficulty !== undefined) question.difficulty = difficulty;
    if (tags !== undefined) {
      question.tags = Array.isArray(tags) ? tags : tags.split(',').map((t) => t.trim()).filter(Boolean);
    }
    if (options !== undefined) {
      const cleanOptions = Array.isArray(options) ? options.map((o) => (o || '').trim()).filter(Boolean) : [];
      question.options = cleanOptions.length === 4 ? cleanOptions : [];
      if (cleanOptions.length !== 4) question.correctOption = null;
    }
    if (correctOption !== undefined && question.options.length === 4) {
      question.correctOption = correctOption === '' ? null : Number(correctOption);
    }

    await question.save();
    res.json(question);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @route DELETE /api/questions/:id
exports.deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ message: 'Question not found' });

    const isOwner = String(question.createdBy) === String(req.user._id);
    if (!isOwner && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this question' });
    }

    await question.deleteOne();
    res.json({ message: 'Question deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @route PUT /api/questions/:id/solve  (toggle solved state for current user)
exports.toggleSolved = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ message: 'Question not found' });

    const idx = question.solvedBy.findIndex((s) => String(s.user) === String(req.user._id));
    if (idx >= 0) {
      question.solvedBy.splice(idx, 1);
    } else {
      question.solvedBy.push({ user: req.user._id });
    }

    await question.save();
    res.json({ solved: idx < 0 });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
