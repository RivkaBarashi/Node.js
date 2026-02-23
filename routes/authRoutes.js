const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// נתיב הרשמה
router.post('/register', authController.register);

// נתיב התחברות
router.post('/login', authController.login);

module.exports = router;
