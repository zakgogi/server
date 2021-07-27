const request = require('supertest');
const { resetTestDB } = require('./config');
const app = require('../../server');

describe('habit endpoints', () => {
    let api;
    beforeEach(async () => {
        await resetTestDB()
    });

    beforeAll(async () => {
        api = app.listen(5000, () => console.log('Test server running on port 5000'))
    });

    afterAll(done => {
        console.log('Gracefully stopping test server')
        api.close(done)
    })

    it('should return a list of all habits in database', async () => {
        const res = await request(api).get('/habits');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(3);
    });
    
    it('should return a list of habits of a specific users', async () => {
        const res = await request(api).get('/habits/1');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(2);
    }); 

})