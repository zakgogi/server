const db = require('../dbConfig');
require('dotenv').config();
const sgMail = require('@sendgrid/mail');
module.exports = class Habit{
    constructor(data){
        this.id = data.id;
        this.habitname = data.habitname;
        this.times_completed = data.times_completed;
        this.frequency_day = data.frequency_day;
        this.streak = data.streak;
        this.username_id = data.username_id;
    };
    
    static get all(){ 
        return new Promise (async (resolve, reject) => {
            try {
                const result = await db.query('SELECT * FROM habits;')
                const habit = result.rows.map(d => new Habit(d))
                resolve(habit);
            } catch (err) {
                reject("Error retrieving Habits")
            }
        })
    };

    static showUserHabits(id){
        return new Promise (async (resolve, reject) => {
            try {
                let habitsData = await db.query(`SELECT habits.*, users.username
                                                    FROM habits
                                                    JOIN users on habits.username_id = users.id
                                                    WHERE username_id = $1;`, [id])
                resolve (habitsData.rows);
            } catch (err) {
                reject('Habit not found');
            }
        });
    };

    static create(data){
        return new Promise (async (resolve, reject) => {
            try {
                let habitsData = await db.query('INSERT INTO habits (habitname, times_completed, frequency_day, streak, username_id) VALUES ($1, $2, $3, $4, $5) RETURNING *;', [data.habitname, data.times_completed, data.frequency_day, data.streak, data.username_id]);
                let habit = new Habit(habitsData.rows[0]);
                let allHabits = await db.query('SELECT * FROM habits WHERE username_id = $1;', [data.username_id]);
                let numberOfHabits = allHabits.rowCount;
                let currentBadge;
                switch (numberOfHabits){
                    case 1:
                        currentBadge = await db.query('SELECT * FROM BADGES WHERE id = $1 and badge_name LIKE $2;', [data.username_id, 'habits1']);
                        if (currentBadge.rows.length === 0){
                            await db.query('INSERT INTO badges (badge_name, username_id) VALUES ($2, $1) RETURNING *;', [data.username_id, 'habits1']);
                        }
                        break;
                    case 5:
                        currentBadge = await db.query('SELECT * FROM BADGES WHERE id = $1 and badge_name LIKE $2;', [data.username_id, 'habits5']);
                        if (currentBadge.rows.length === 0){
                            await db.query('INSERT INTO badges (badge_name, username_id) VALUES ($2, $1) RETURNING *;', [data.username_id, 'habits5']);
                        }
                        break;
                    case 10:
                        currentBadge = await db.query('SELECT * FROM BADGES WHERE id = $1 and badge_name LIKE $2;', [data.username_id, 'habits10']);
                        if (currentBadge.rows.length === 0){
                            await db.query('INSERT INTO badges (badge_name, username_id) VALUES ($2, $1) RETURNING *;', [data.username_id, 'habits10']);
                        }
                        break;
                    default:
                        break;
                } 
                resolve(habit);
            } catch (err) {
                reject('Habit cannot be created.');
            }
        });
    };

    static destroy(data){
        return new Promise(async(resolve, reject) => {
            try {
                const result = await db.query('DELETE FROM habits WHERE id = $1', [ data.id ]);
                if (result.rowCount !== 0){  
                    resolve('Habit was deleted');
                } else {
                    throw new Error(err);
                }
            } catch (err) {
                reject('Habit could not be deleted')
            }
        })
    };

    static update(data){
        return new Promise(async(resolve, reject) => {
            try {
                //change times_completed + 1 to data.times_completed
                const result = await db.query('UPDATE habits SET times_completed = $2  WHERE id = $1;', [data.id, data.times_completed]);
                if (data.times_completed === data.frequency_day){
                    const streak = await db.query('UPDATE habits SET streak = streak + 1 WHERE id = $1;', [data.id]);
                    const updatedRow = await db.query('SELECT * FROM habits WHERE id = $1;', [data.id]);
                    let streakNumber = updatedRow.rows[0].streak;
                    let userId = updatedRow.rows[0].username_id;
                    let currentBadge;
                    switch (streakNumber){
                        case 1:
                            currentBadge = await db.query('SELECT * FROM BADGES WHERE id = $1 and badge_name LIKE $2;', [userId, 'streak1']);
                            if (currentBadge.rows.length === 0){
                                await db.query('INSERT INTO badges (badge_name, username_id) VALUES ($2, $1) RETURNING *;', [userId, 'streak1']);
                            }
                            break;
                        case 3:
                            currentBadge = await db.query('SELECT * FROM BADGES WHERE id = $1 and badge_name LIKE $2;', [userId, 'streak3']);
                            if (currentBadge.rows.length === 0){
                                await db.query('INSERT INTO badges (badge_name, username_id) VALUES ($2, $1) RETURNING *;', [userId, 'streak3']);
                            }
                            break;
                        case 7:
                            currentBadge = await db.query('SELECT * FROM BADGES WHERE id = $1 and badge_name LIKE $2;', [userId, 'streak7']);
                            if (currentBadge.rows.length === 0){
                                await db.query('INSERT INTO badges (badge_name, username_id) VALUES ($2, $1) RETURNING *;', [userId, 'streak7']);
                            }
                            break;
                        case 14:
                            currentBadge = await db.query('SELECT * FROM BADGES WHERE id = $1 and badge_name LIKE $2;', [userId, 'streak14']);
                            if (currentBadge.rows.length === 0){
                                await db.query('INSERT INTO badges (badge_name, username_id) VALUES ($2, $1) RETURNING *;', [userId, 'streak14']);
                            }
                            break;
                        case 30:
                            currentBadge = await db.query('SELECT * FROM BADGES WHERE id = $1 and badge_name LIKE $2;', [userId, 'streak30']);
                            if (currentBadge.rows.length === 0){
                                await db.query('INSERT INTO badges (badge_name, username_id) VALUES ($2, $1) RETURNING *;', [userId, 'streak30']);
                            }
                            break;
                        case 90:
                            currentBadge = await db.query('SELECT * FROM BADGES WHERE id = $1 and badge_name LIKE $2;', [userId, 'streak90']);
                            if (currentBadge.rows.length === 0){
                                await db.query('INSERT INTO badges (badge_name, username_id) VALUES ($2, $1) RETURNING *;', [userId, 'streak90']);
                            }
                            break;
                        case 365:
                            currentBadge = await db.query('SELECT * FROM BADGES WHERE id = $1 and badge_name LIKE $2;', [userId, 'streak365']);
                            if (currentBadge.rows.length === 0){
                                await db.query('INSERT INTO badges (badge_name, username_id) VALUES ($2, $1) RETURNING *;', [userId, 'streak365']);
                            }
                            break;
                        default:
                            break;
                    }   
                }
                if (result.rowCount !== 0){  
                    resolve('Habit times completed updated successfully');
                } else {
                    throw new Error(err);
                }
            } catch (err) {
                reject('Habit times completed could not be updated');
            }
        })
    };

    static streakCheck(){
        return new Promise(async(resolve, reject) => {
            try {
                const result = await db.query('SELECT id, frequency_day, times_completed FROM Habits;');
                result.rows.forEach(async r => {
                    const timeCompleteUpdate = await db.query('UPDATE habits SET times_completed = 0 WHERE id = $1;', [r.id]);
                    if (r.frequency_day !== r.times_completed){
                        const update = await db.query('UPDATE habits SET streak = 0 WHERE id = $1;', [r.id]);
                    };
                });
                resolve('Successfully set/reset streak');
            } catch (err) {
                reject('Cannot find streak');
            }
        })
    };

    static sendEmail(data){
        const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY.toString();
        sgMail.setApiKey(SENDGRID_API_KEY);
        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth();
        const year = today.getFullYear();
        let date =  new Date(year, month, day, data.timeHour, data.timeMin);
        let unixDate = date.getTime() / 1000;
        console.log(data);
        const msg = {
            to: `${data.email}`,
            from: 'stridereminderapp@gmail.com',
            subject: `Reminder to ${data.habitname}`,
            text: `Make sure you complete ${data.habitname} today!`,
            html: `<p>Make sure you complete ${data.habitname} today!</p>`,
            sendAt: unixDate
        }
        sgMail.send(msg).then(() => {
            console.log('Email Request Sent');
        }).catch((err) => {
            console.error(err);
        })
    }

};