const db = require('./dbConfig');

function streakCheck(){
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

streakCheck();
