const fs = require("fs");
const { Pool } = require('pg');
const app = require('../../server.js');

const testSeed = fs.readFileSync(__dirname + '/test_seeds.sql').toString();

const resetTestDB = () => {
    return new Promise (async (resolve, reject) => {
        try {
            const db = new Pool()
            await db.query(testSeed);
            resolve('Test DB reset');
        } catch (err) {
            reject(`Test DB could not be reset: ${err} in ${err.file}`);
        };
    });
}

module.exports = { resetTestDB }