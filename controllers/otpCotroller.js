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



module.exports = {
    sendOtp,
    verifyOtp
}