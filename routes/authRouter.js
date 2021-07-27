const express = require('express');
const { signUp, login, logout } = require('../controllers/authController');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);
router.get('/logout', authenticateToken, logout);

module.exports = router;
