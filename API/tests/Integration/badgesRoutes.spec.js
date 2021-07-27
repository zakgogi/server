const request = require('supertest');
const config = require('./config');
const app = require('../../server');

describe('badge endpoints', () => {
    let api;
    beforeEach(async () => {
        await config.resetTestDB();
    });

    beforeAll(async () => {
        api = app.listen(5000, () => console.log('Test server running on port 5000'))
    });

    afterAll(async () => {
        console.log('Gracefully stopping test server');
        await api.close();
    })

    it('should return a list of all badges in database', async () => {
        const res = await request(api).get('/badges');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(3);
    });

    it('should return a list of all badges for a given user', async () => {
        const res = await request(api).get('/badges/1');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(2);
    });

});