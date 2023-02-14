const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/tutor-db');


// TUTOR SIGNUP (to post Tutor)
router.post('/tutor/signup', async (req, res) => {
  const { firstname,lastname,phone, email, password } = req.body;

  try {
    // Check if user with given email exists
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    // Create a new user object with hashed password
    user = new User({
      firstname,
      lastname,
      phone,
      email,
      password: await bcrypt.hash(password, 10),
    });

    // Save the new user to the database
    await user.save();

    // Generate JWT token and store in a cookie
    const token = jwt.sign({ id: user._id }, "$2a1@3#4$", { expiresIn: '1h' }); // secret key = $2a1@3#4$
    res.cookie('token', token, { httpOnly: true });

    return res.status(200).json({user, message: 'Signup successful.'});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;
