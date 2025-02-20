const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { validateLoginInput } = require('../utils/validation');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) {
      return res.status(400).json({ errors });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ email: 'User not found' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ password: 'Invalid password' });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      token: `Bearer ${token}`,
      user: {
        id: user._id,
        email: user.email
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ email: 'Email already exists' });
    }

    // Create new user
    const user = new User({
      email,
      password
    });

    await user.save();

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      success: true,
      token: `Bearer ${token}`,
      user: {
        id: user._id,
        email: user.email
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Server error' });
  }
}; 