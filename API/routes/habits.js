const express = require('express');
const router = express.Router();
const habitsController = require('../controllers/habits');

router.get('/', habitsController.show);
router.get('/:id', habitsController.showUserHabits);
router.post('/', habitsController.create);
router.delete('/', habitsController.destroy);
router.patch('/', habitsController.update);
router.post('/email', habitsController.sendEmail);


module.exports = router;



