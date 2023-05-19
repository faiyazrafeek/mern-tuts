const asyncHnadler = require('express-async-handler')
const nodemailer = require('nodemailer');


// @desc    Send OTP
// @route   GET /api/otp
// @access  Private
const sendOtp = asyncHnadler(async (req, res) => {
    const email = req.params.email;

    // Generate OTP
    const otp = generateOTP();
  
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
})

const verifyOtp = asyncHnadler(async (req, res) => {
    const email = req.params.email;

    // Generate OTP
    const otp = generateOTP();
  
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