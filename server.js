const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { auth } = require("./middlewares/auth");
const loginRoute = require("./routes/tutor-login");
const signupRoute = require("./routes/tutor-signup");
const tutorRoute = require("./routes/tutor");
const resetPassword = require("./routes/reset-password");

const app = express();

// Middleware for parsing cookies and JSON requests
app.use(cookieParser());
app.use(express.json());

// Middleware for CORS
app.use(
  cors({
    origin: "*",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Connect to MongoDB database
mongoose.connect(
  "mongodb+srv://fall2022_comp3123:SAFA.aru1993@cluster0.lclqo7i.mongodb.net/CAPSTONE?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Routes for TUTOR authentication and registration
app.use("/home", loginRoute);
app.use("/home", signupRoute);
app.use("/home", tutorRoute);

// Route for getting user data
app.get("/user", auth, (req, res) => {
  res.json({ user: req.user });
});

/*
// Check authentication
router.get('/api/auth/check', auth, (req, res) => {
  res.status(200).json({ message: 'User authenticated.' });
});
*/

const PORT = process.env.PORT || 4000;

// Start the server
app.listen(PORT || 4000, () => {
  console.log("Server started on port 4000");
  console.log("http://localhost:4000");
});
