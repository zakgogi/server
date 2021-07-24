const User = require('../models/users');

async function show(req, res){
    try {
        const user = await User.all;
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({err});
    }
};

module.exports = { show };