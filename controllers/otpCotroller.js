const asyncHandler = require('express-async-handler')
const nodemailer = require('nodemailer');

const User = require('../model/userModel')


// @desc    Send OTP
// @route   POST /api/otp/sendotp
// @access  Public
const sendOtp = asyncHandler(async (req, res) => {
    const email = req.params.email;

    // Generate OTP
    const otp = generateOTP();

    // Set OTP expiration time to 5 minutes from now
    const otpExpiration = new Date();
    otpExpiration.setMinutes(otpExpiration.getMinutes() + 2);
  
    // Compose the email
    const mailOptions = {
      from: 'fadesign001@gmail.com',
      to: email,
      subject: 'INORA App Login OTP Verification',
      html: `<h2>Please find your OTP Below</h2><h2><bold>Your OTP is: ${otp}</bold></h2>`
    };
  
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send('Failed to send OTP');
      } else {
        console.log('Email sent: ' + info.response);
        res.send('OTP sent successfully');
      }
    });

    const user = await User.findOne({ email });
    
    if (!user) {
      res.status(404)
      throw new Error('User not found')
    }

     await User.findOneAndUpdate({ email }, { otp, otpExpiration });
})

// @desc    Verify OTP
// @route   POST /api/otp/verifyotp
// @access  Public
const verifyOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

   // Find the user by email
   const user = await User.findOne({ email });

   if (!user) {
     res.status(404).json({ error: 'User not found.' });
   }

    // Check if the OTP has expired
    const now = new Date();
    if (now > user.otpExpiration) {
      res.status(400).json({ error: 'OTP has expired.'});
      // Check if the OTP matches
    }else if (user.otp === otp) {
      // OTP is verified, you can perform further actions here
      res.json({ message: 'OTP verified successfully.' });
    } else {
      res.status(400).json({ error: 'Invalid OTP.' });
    }
})

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'fadesign001@gmail.com',
      pass: process.env.GMAIL_SECRET
    }
  });


// Generate a random OTP
function generateOTP() {
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < 6; i++) {
      otp += digits[Math.floor(Math.random() * 10)];
    }
    return otp;
  }

// Verify the OTP provided by the user
const verifyOTP = (userId, otp) => {
    // Retrieve the stored OTP and expiration time associated with the user from the database or cache system
    // Example: const { storedOTP, expirationTime } = getOTPFromDatabase(userId);
    const storedOTP = '123456'; // Replace with your retrieval code
    const expirationTime = 1621474566000; // Replace with your retrieval code
  
    if (otp === storedOTP && Date.now() < expirationTime) {
      // OTP is valid and not expired
      console.log(`OTP verification successful for user ${userId}`);
      return true;
    } else {
      // OTP is invalid or expired
      console.log(`OTP verification failed for user ${userId}`);
      return false;
    }
  };



module.exports = {
    sendOtp,
    verifyOtp
}