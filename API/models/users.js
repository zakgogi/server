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

    static create({ username, email, password }){
        return new Promise(async (res, rej) => {
            try {
                let result = await db.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *;', [username, email, password]);
                let user = new User(result.rows[0]);
                res(user);
            } catch (err) {
                rej(`Error creating user: ${err}`)
            }
        })
    };

    static findByUsername(username){
        return new Promise(async (res, rej) => {
            try {
                let result = await db.query('SELECT * FROM users WHERE username = $1;', [username]);
                if (result.rows.length !== 0){
                    let user = new User(result.rows[0])
                    res(user)
                } else {
                    throw new Error(err);
                }
            } catch (err) {
                rej(`Error retrieving user: ${err}`)
            }
        })
    }

};

