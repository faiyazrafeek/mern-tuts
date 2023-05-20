const express = require('express')
const router = express.Router();

const {sendOtp, verifyOtp} = require('../controllers/otpCotroller')


router.route('/sendotp/:email').post(sendOtp)
router.route('/verifyotp').post(verifyOtp)

module.exports = router