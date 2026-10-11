const mongoose = require('mongoose');

const reviewItemSchema = new mongoose.Schema(
  {
    question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
    title: { type: String },
    description: { type: String },
    options: { type: [String], default: [] },
    correctOption: { type: Number, default: null },
    selectedOption: { type: Number, default: null },
    isCorrect: { type: Boolean, default: false },
    explanation: { type: String, default: '' },
  },
  { _id: false }
);

const resultSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    subject: { type: String, required: true },
    totalQuestions: { type: Number, required: true },
    correct: { type: Number, required: true },
    wrong: { type: Number, required: true },
    percentage: { type: Number, required: true },
    durationMinutes: { type: Number, default: 0 },
    review: { type: [reviewItemSchema], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Result', resultSchema);
