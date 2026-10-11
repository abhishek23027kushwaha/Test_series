const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    answer: { type: String, default: '' },
    subject: { type: String, required: true },
    company: { type: String, default: 'Others' },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Easy' },
    tags: { type: [String], default: [] },
    options: { type: [String], default: [] },
    correctOption: { type: Number, default: null },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    solvedBy: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        solvedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

questionSchema.index({ title: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model('Question', questionSchema);
