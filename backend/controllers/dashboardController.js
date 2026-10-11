const Question = require('../models/Question');
const Bookmark = require('../models/Bookmark');
const Result = require('../models/Result');

// @route GET /api/dashboard
exports.getDashboard = async (req, res) => {
  try {
    const userId = req.user._id;

    const totalQuestions = await Question.countDocuments();
    const solvedCount = await Question.countDocuments({ 'solvedBy.user': userId });
    const bookmarkCount = await Bookmark.countDocuments({ user: userId });
    const progressPercent = totalQuestions > 0 ? Math.round((solvedCount / totalQuestions) * 100) : 0;

    const recentResults = await Result.find({ user: userId }).sort({ createdAt: -1 }).limit(5);

    const recentSolved = await Question.find({ 'solvedBy.user': userId })
      .sort({ updatedAt: -1 })
      .limit(5)
      .select('title subject updatedAt');

    const recentActivity = [
      ...recentResults.map((r) => ({
        type: 'mocktest',
        text: `Completed ${r.subject} mock test — ${r.percentage}%`,
        date: r.createdAt,
      })),
      ...recentSolved.map((q) => ({
        type: 'solved',
        text: `Marked "${q.title}" as solved`,
        date: q.updatedAt,
      })),
    ]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 8);

    // subject-wise breakdown for weak/strong subjects
    const bySubject = await Question.aggregate([
      {
        $group: {
          _id: '$subject',
          total: { $sum: 1 },
          solved: {
            $sum: {
              $cond: [{ $in: [userId, '$solvedBy.user'] }, 1, 0],
            },
          },
        },
      },
    ]);

    // difficulty-wise breakdown (Easy / Medium / Hard)
    const byDifficultyRaw = await Question.aggregate([
      {
        $group: {
          _id: '$difficulty',
          total: { $sum: 1 },
          solved: {
            $sum: {
              $cond: [{ $in: [userId, '$solvedBy.user'] }, 1, 0],
            },
          },
        },
      },
    ]);
    const order = ['Easy', 'Medium', 'Hard'];
    const byDifficulty = order.map(
      (level) =>
        byDifficultyRaw.find((d) => d._id === level) || { _id: level, total: 0, solved: 0 }
    );

    const subjectCount = bySubject.length;

    res.json({
      totalQuestions,
      solvedCount,
      bookmarkCount,
      progressPercent,
      subjectCount,
      recentActivity,
      bySubject,
      byDifficulty,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
