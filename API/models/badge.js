const db = require('../dbConfig');

module.exports = class Badge{
    constructor(data){
        this.id = data.id;
        this.badge_name = data.badge_name;
        this.username_id = data.username_id;
    };
    static get all(){ 
        return new Promise (async (resolve, reject) => {
            try {
                const result = await db.query('SELECT * FROM badges;')
                const badge = result.rows.map(d => new Badge(d))
                resolve(badge);
            } catch (err) {
                reject("Error retrieving badges")
            }
        })
    };

    static showUserBadges(id){
        return new Promise (async (resolve, reject) => {
            try {
                let badgesData = await db.query(`SELECT badges.*, users.username
                                                    FROM badges
                                                    JOIN users on badges.username_id = users.id
                                                    WHERE username_id = $1;`, [id])
                resolve (badgesData.rows);
            } catch (err) {
                reject('Badge not found');
            }
        });
    };


}