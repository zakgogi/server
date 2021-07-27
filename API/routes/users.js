const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
// const { verifyToken } = require('../middleware/auth');

router.get('/', userController.showAll);

module.exports = router;

