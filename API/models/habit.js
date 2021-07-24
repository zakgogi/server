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

};