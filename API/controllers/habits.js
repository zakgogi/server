const Habit = require('../models/habit');
//To schedule a function running at midnight each day
const cron = require('node-cron');

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
        const habit = await Habit.destroy(req.body);
        res.status(204).json(habit);
    } catch (err) {
        res.status(404).json({err});
    }
};

async function update(req, res){
    try {
        const habit = await Habit.update(req.body);
        //not getting back this when making a postman request
        res.status(204).json(habit);
    } catch (err) {
        res.status(404).json({err});
    }
};

cron.schedule('59 23 * * *', () => {
    console.log('Running a job at Midnight at UK timezone');
    streakCheck();
  }, {
    scheduled: true,
    timezone: "Europe/London"
  });

async function streakCheck(req, res){
    try {
        const habit = await Habit.streakCheck();
        // res.status(204).json(habit);
    } catch (err) {
        // res.status(404).json({err});
    }
}



module.exports = { show, showUserHabits, create, destroy, update, streakCheck };