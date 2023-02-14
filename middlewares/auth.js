const jwt = require('jsonwebtoken');

// Middleware to check if user is authenticated
const auth = (req, res, next) => {
  // Check if a JWT token is present in the cookie
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Not authorized.' });
  }

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, "$2a1@3#4$");

    // Add the user ID to the request object
    req.user = decoded;

    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: 'Not authorized.' });
  }
};

module.exports = { auth };
