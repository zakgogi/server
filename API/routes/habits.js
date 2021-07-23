const express = require('express');
const router = express.Router();
const habitsController = require('../controllers/habits')

// router.get('/', authorsController.index);
router.get('/', habitsController.show);

module.exports = router;



