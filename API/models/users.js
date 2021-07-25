const db = require('../dbConfig');

module.exports = class User{
    constructor(data){
        this.id = data.id;
        this.username = data.username
        this.email = data.email;
        this.password = data.password;
    };
    
    static get all(){ 
        return new Promise (async (resolve, reject) => {
            try {
                const result = await db.query('SELECT * FROM users;')
                const users = result.rows.map(d => new User(d))
                resolve(users);
            } catch (err) {
                reject("Error retrieving users")
            }
        })
    };
};

