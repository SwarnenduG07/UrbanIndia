const express = require('express');
const router = express.Router();
const { signup, signin, signout, verifyOtp } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');


router.post('/signup', signup);
router.post('/signin', signin);
router.post('/signout', authMiddleware, signout);
router.post('/verify-otp', verifyOtp);

module.exports = router;