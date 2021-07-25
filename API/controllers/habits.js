const Habit = require('../models/habit');

async function show(req, res){
    try {
        const habit = await Habit.all;
        res.status(200).json(habit);
    } catch (err) {
        res.status(500).json({err});
    }
};

async function showJoin(req, res){
    try {
        const habit = await Habit.showJoin(req.params.id);
        res.status(200).json(habit);
    } catch (err) {
        res.status(500).json({err});
    }
};

module.exports = { show, showJoin};