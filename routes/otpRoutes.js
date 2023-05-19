const express = require('express')
const router = express.Router();

const {sendOtp, verifyOtp} = require('../controllers/otpCotroller')


router.route('/sendotp/:email').get(sendOtp)
router.route('/verifyotp/:email').get(verifyOtp)

module.exports = router