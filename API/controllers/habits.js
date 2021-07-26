const Habit = require('../models/habit');

async function show(req, res){
    try {
        const habit = await Habit.all;
        res.status(200).json(habit);
    } catch (err) {
        res.status(500).json({err});
    }
};

async function showUserHabits(req, res){
    try {
        const habit = await Habit.showUserHabits(req.params.id);
        res.status(200).json(habit);
    } catch (err) {
        res.status(404).json({err});
    }
};

async function create(req, res){
    try {
        const habit = await Habit.create(req.body);
        res.status(201).json(habit);
    } catch (err) {
        res.status(422).json({err});
    }
};

async function destroy(req, res){
    try {
        console.log(req.body);
        const habit = await Habit.destroy(req.body);
        res.status(204).json(habit);
    } catch (err) {
        res.status(404).json({err});
    }
};



module.exports = { show, showUserHabits, create, destroy };