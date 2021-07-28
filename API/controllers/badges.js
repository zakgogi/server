const Badge = require('../models/badge');

async function show(req, res){
    try {
        const badge = await Badge.all;
        res.status(200).json(badge);
    } catch (err) {
        res.status(500).json({err});
    }
};

async function showUserBadges(req, res){
    try {
        const badge = await Badge.showUserBadges(req.params.id);
        res.status(200).json(badge);
    } catch (err) {
        res.status(404).json({err});
    }
};


module.exports = { show, showUserBadges };