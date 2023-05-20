const express = require('express')
const router = express.Router();

const {resetPasword} = require('../controllers/forgotPasswordController')


router.route('/').post(resetPasword)

module.exports = router