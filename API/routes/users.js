const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');

// router.get('/', authorsController.index);
router.get('/', userController.showAll);

module.exports = router;