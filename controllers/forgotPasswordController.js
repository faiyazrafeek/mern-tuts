const asyncHandler = require('express-async-handler')
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const User = require('../model/userModel')

// @desc    Send OTP
// @route   POST /api/forgot-password
// @access  Public
const resetPasword = asyncHandler(async (req, res) => {
    const { email } = req.body;

    // Check if the email exists in the database
    const user = await User.findOne({ email });
    
    if (!user) {
      res.status(404)
      throw new Error('User not found')
    }

    // Generate a password reset token
    const resetToken = generateToken();

    // Save the reset token and its expiration time in the user document
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
    await user.save();
  
    // Compose the email
    const mailOptions = {
      from: 'fadesign001@gmail.com',
      to: email,
      subject: 'INORA App Forgot Password',
      html: `<h2><bold>Your password reset token is: ${resetToken}</bold></h2>`
    };
  
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send('Failed to send reset token');
      } else {
        console.log('Email sent: ' + info.response);
        res.send('OTP sent successfully');
      }
    });

    res.status(200).json({ message: `Password reset instructions sent to ${email}` });
})

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'fadesign001@gmail.com',
      pass: process.env.GMAIL_SECRET
    }
});

// Generate a random token
function generateToken() {
    return crypto.randomBytes(20).toString('hex');
}

module.exports = { resetPasword }