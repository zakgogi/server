const express = require('express');
const router = express.Router();
const habitsController = require('../controllers/habits');
const { route } = require('./users');

// router.get('/', authorsController.index);
router.get('/', habitsController.show);
router.get('/:id', habitsController.showJoin);

module.exports = router;



