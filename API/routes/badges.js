const express = require('express');
const router = express.Router();
const badgeController = require('../controllers/badges');

router.get('/', badgeController.show);
router.get('/:id', badgeController.showUserBadges);

module.exports = router;