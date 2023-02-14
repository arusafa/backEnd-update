const express = require("express");
const router = express.Router();
const Tutor = require("../models/tutor-db");

router.post("/reset-password", async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await Tutor.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate and store a password reset token for the user
    user.generatePasswordResetToken();

    // Save the user with the new password reset token
    await user.save();

    // Send password reset email to user's email address
    // This would typically involve using a third-party email service like SendGrid or Mailchimp

    return res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;