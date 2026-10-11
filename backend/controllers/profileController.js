const User = require('../models/User');

exports.getProfile = async (req, res) => {
  res.json({ user: req.user });
};

exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const { name, bio, skills, college, experience, photo } = req.body;
    if (name !== undefined) user.name = name;
    if (bio !== undefined) user.bio = bio;
    if (college !== undefined) user.college = college;
    if (experience !== undefined) user.experience = experience;
    if (photo !== undefined) user.photo = photo;
    if (skills !== undefined) {
      user.skills = Array.isArray(skills) ? skills : skills.split(',').map((s) => s.trim()).filter(Boolean);
    }

    await user.save();
    res.json({ user: user.toSafeObject() });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
