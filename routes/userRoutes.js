const express = require('express')
const router = express.Router();
const {getMe, loginUser, registerUser} = require('../controllers/UserController')
const {protect} = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me',protect, getMe)

// router.route('/:id').put(updateUser).delete(deleteUser)

module.exports = router