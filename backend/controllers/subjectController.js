const Subject = require('../models/Subject');
const Question = require('../models/Question');

exports.getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find().sort({ name: 1 }).lean();

    const counts = await Question.aggregate([{ $group: { _id: '$subject', count: { $sum: 1 } } }]);
    const countMap = Object.fromEntries(counts.map((c) => [c._id, c.count]));

    const withCounts = subjects.map((s) => ({ ...s, questionCount: countMap[s.name] || 0 }));
    res.json(withCounts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createSubject = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ message: 'Name is required' });
    const exists = await Subject.findOne({ name });
    if (exists) return res.status(400).json({ message: 'Subject already exists' });
    const subject = await Subject.create({ name, description });
    res.status(201).json(subject);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
