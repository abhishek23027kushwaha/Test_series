const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// @desc Register new user
// @route POST /api/auth/register
exports.register = async (req, res) => {
  try {
    const { name, email, password, securityQuestion, securityAnswer } = req.body;

    if (!name || !email || !password || !securityQuestion || !securityAnswer) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      securityQuestion,
      securityAnswer,
    });

    const token = generateToken(user._id);
    res.status(201).json({ token, user: user.toSafeObject() });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Login
// @route POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user._id);
    res.json({ token, user: user.toSafeObject() });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Get security question for an email (step 1 of password reset, no email needed)
// @route POST /api/auth/forgot-password/question
exports.getSecurityQuestion = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: (email || '').toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: 'No account found with that email' });
    }
    res.json({ securityQuestion: user.securityQuestion });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Reset password using security answer
// @route POST /api/auth/forgot-password/reset
exports.resetPassword = async (req, res) => {
  try {
    const { email, securityAnswer, newPassword } = req.body;
    if (!email || !securityAnswer || !newPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: 'No account found with that email' });
    }

    const isMatch = await user.matchSecurityAnswer(securityAnswer);
    if (!isMatch) {
      return res.status(401).json({ message: 'Security answer is incorrect' });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password reset successful. You can now log in.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Get current logged-in user
// @route GET /api/auth/me
exports.getMe = async (req, res) => {
  res.json({ user: req.user });
};
