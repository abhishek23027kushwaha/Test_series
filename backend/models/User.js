const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    securityQuestion: { type: String, required: true },
    securityAnswer: { type: String, required: true },
    photo: { type: String, default: '' },
    bio: { type: String, default: '' },
    skills: { type: [String], default: [] },
    college: { type: String, default: '' },
    experience: { type: String, default: '' },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  if (this.isModified('securityAnswer')) {
    const salt = await bcrypt.genSalt(10);
    this.securityAnswer = await bcrypt.hash(this.securityAnswer.toLowerCase().trim(), salt);
  }
  next();
});

userSchema.methods.matchPassword = function (entered) {
  return bcrypt.compare(entered, this.password);
};

userSchema.methods.matchSecurityAnswer = function (entered) {
  return bcrypt.compare(entered.toLowerCase().trim(), this.securityAnswer);
};

userSchema.methods.toSafeObject = function () {
  return {
    _id: this._id,
    name: this.name,
    email: this.email,
    role: this.role,
    photo: this.photo,
    bio: this.bio,
    skills: this.skills,
    college: this.college,
    experience: this.experience,
    securityQuestion: this.securityQuestion,
    createdAt: this.createdAt,
  };
};

module.exports = mongoose.model('User', userSchema);
