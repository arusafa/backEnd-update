const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/tutor-db');
const { auth } = require('../middlewares/auth');

// TUTOR LOG-IN (to post Tutor)
router.post('/tutor/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user with given email exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Generate JWT token and store in a cookie
    const token = jwt.sign({ id: user._id }, "$2a1@3#4$", { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });

    return res.status(200).json({user, message: 'Login successful.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error.' });
  }
});

// LOGIN GET / (to get Tutor)
router.get('/tutor/login', auth, async (req, res) => {
    try {
      // Find the user with the given ID in the JWT token
      const user = await User.findById(req.user.id).select('email');
  
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      return res.status(200).json(user);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error.' });
    }
  });
  

// TUTOR LOG-OUT
router.post('/logout', auth, async (req, res) => {
  try {
    // Clear the JWT token stored in the cookie
    res.clearCookie('token');
    return res.status(200).json({message: 'Logout successful.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;
