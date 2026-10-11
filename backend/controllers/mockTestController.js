const Question = require('../models/Question');
const Result = require('../models/Result');

// @route GET /api/mocktest/start?subject=React&count=20
// Only pulls questions that have proper MCQ options set up (exactly 4 choices).
// The correct option index is intentionally withheld here so the test can't be cheated.
exports.startTest = async (req, res) => {
  try {
    const { subject, count } = req.query;
    if (!subject) return res.status(400).json({ message: 'Subject is required' });

    const limit = Math.min(parseInt(count, 10) || 10, 50);

    const questions = await Question.aggregate([
      { $match: { subject, $expr: { $eq: [{ $size: { $ifNull: ['$options', []] } }, 4] } } },
      { $sample: { size: limit } },
      { $project: { title: 1, description: 1, options: 1, difficulty: 1, subject: 1 } },
    ]);

    console.log("Subject:", subject);
console.log("Questions found:", questions.length);
console.log(questions);
    if (questions.length === 0) {
      return res.status(404).json({
        message: `No MCQ-ready questions found for ${subject} yet. Add options to some questions first.`,
      });
    }


    
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @route POST /api/mocktest/submit
// body: { subject, durationMinutes, answers: [{ questionId, selectedOption }] }
// Grades against the real correctOption stored in the DB (never trusts the client's score).
exports.submitTest = async (req, res) => {
  try {
    const { subject, durationMinutes, answers } = req.body;
    if (!subject || !Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({ message: 'Missing subject or answers' });
    }

    const questionIds = answers.map((a) => a.questionId);
    const questions = await Question.find({ _id: { $in: questionIds } });
    const questionMap = Object.fromEntries(questions.map((q) => [String(q._id), q]));

    let correctCount = 0;
    const review = answers.map((a) => {
      const q = questionMap[a.questionId];
      if (!q) {
        return {
          question: a.questionId,
          title: 'Question no longer available',
          options: [],
          correctOption: null,
          selectedOption: a.selectedOption,
          isCorrect: false,
          explanation: '',
        };
      }
      const isCorrect = q.correctOption !== null && q.correctOption === a.selectedOption;
      if (isCorrect) correctCount += 1;
      return {
        question: q._id,
        title: q.title,
        description: q.description,
        options: q.options,
        correctOption: q.correctOption,
        selectedOption: a.selectedOption,
        isCorrect,
        explanation: q.answer || '',
      };
    });

    const totalQuestions = answers.length;
    const wrong = totalQuestions - correctCount;
    const percentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

    const result = await Result.create({
      user: req.user._id,
      subject,
      totalQuestions,
      correct: correctCount,
      wrong,
      percentage,
      durationMinutes: durationMinutes || 0,
      review,
    });

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @route GET /api/mocktest/results
exports.getResults = async (req, res) => {
  try {
    const results = await Result.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .select('-review'); // list view stays light; full paper fetched individually
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @route GET /api/mocktest/results/:id
exports.getResultDetail = async (req, res) => {
  try {
    const result = await Result.findOne({ _id: req.params.id, user: req.user._id });
    if (!result) return res.status(404).json({ message: 'Result not found' });
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
