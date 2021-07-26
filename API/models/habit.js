const db = require('../dbConfig');

module.exports = class Habit{
    constructor(data){
        this.id = data.id;
        this.habitname = data.habitname;
        this.timesCompleted = data.timesCompleted;
        this.frequencyDay = data.frequencyDay;
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

    static showJoin(id){
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

};