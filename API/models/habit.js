const db = require('../dbConfig');

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

};