const request = require('supertest');
const { resetTestDB } = require('./config');
const app = require('../../server');

describe('user and auth endpoints', () => {
    let api;
    beforeEach(async () => {
        await resetTestDB()
    });

    beforeAll(async () => {
        api = app.listen(5000, () => console.log('Test server running on port 5000'))
    });

    afterAll(async () => {
        console.log('Gracefully stopping test server');
        await api.close();
    });

    it('should return a list of all users', async () => {
        const res = await request(api).get('/users');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(3);
    });

    it('should add a user to database on registration', async () => {
        const res = await request(api)
        .post('/auth/register')
        .send({
            username: 'Test Guy',
            email: 'TestGuy@Test.com',
            password: 'TestTestTest'
        })
    // console.log(res);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty("id");
        const userRes = await request(api).get('/users');
        expect(userRes.body.length).toEqual(4);
    });

    it('should allow login with correct username password', async () => {
        const res = await request(api)
        .post('/auth/login')
        .send({
            username: 'Test User 3',
            password: 'TestTestTest'
        })
        expect(res.statusCode).toEqual(200);
    });

    it('prevent login with incorrect password', async () => {
        const res = await request(api)
        .post('/auth/login')
        .send({
            username: 'Test User 3',
            password: 'WrongWrongWrong'
        })
        expect(res.statusCode).toEqual(401);
    });

    it('prevent login with username that does not exist', async () => {
        const res = await request(api)
        .post('/auth/login')
        .send({
            username: 'Test User 4',
            password: 'TestTestTest'
        })
        expect(res.statusCode).toEqual(401);
    });


});
