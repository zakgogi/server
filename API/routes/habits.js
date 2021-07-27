const express = require('express');
const router = express.Router();
const habitsController = require('../controllers/habits');
const { route } = require('./users');
const { verifyToken } = require('../middleware/auth');

router.get('/', verifyToken, habitsController.show);
router.get('/:id', verifyToken, habitsController.showUserHabits);
router.post('/', habitsController.create);
router.delete('/', habitsController.destroy);
router.patch('/', habitsController.update);
// router.get('/streak', habitsController.streakCheck);

module.exports = router;



