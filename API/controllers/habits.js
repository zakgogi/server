const Habit = require('../models/habit');
const User = require('../models/users');

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


async function sendEmail(req, res){
    try {
        const user = await User.findByUsername(req.body.username);
        const emailSend = await Habit.sendEmail({...req.body, email: user.email});
        res.status(201).json({message: 'Email will be sent'})
    } catch (err) {
        res.status(422).json({err})
    }
}



module.exports = { show, showUserHabits, create, destroy, update, sendEmail };