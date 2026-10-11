const Bookmark = require('../models/Bookmark');

exports.getBookmarks = async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ user: req.user._id }).populate('question');
    res.json(bookmarks.map((b) => b.question).filter(Boolean));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.toggleBookmark = async (req, res) => {
  try {
    const { questionId } = req.params;
    const existing = await Bookmark.findOne({ user: req.user._id, question: questionId });
    if (existing) {
      await existing.deleteOne();
      return res.json({ bookmarked: false });
    }
    await Bookmark.create({ user: req.user._id, question: questionId });
    res.json({ bookmarked: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
