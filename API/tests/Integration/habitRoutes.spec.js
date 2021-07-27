const request = require('supertest');
const config = require('./config');
const app = require('../../server');

describe('habit endpoints', () => {
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

    it('should create a habit for a given user', async () => {
        const res = await request(api)
            .post('/habits')
            .send({
                habitname: 'Drink some water',
                times_completed: 0,
                frequency_day: 3,
                streak: 0,
                username_id: 2
            })
        // console.log(res);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty("id");
        const habitRes = await request(api).get('/habits/2');
        expect(habitRes.body.length).toEqual(2);

    });

    it('should delete a habit for a given user', async () => {
        const res = await request(api)
            .delete('/habits')
            .send({
                id: 1
            })

        expect(res.statusCode).toEqual(204);
        const habitRes = await request(api).get('/habits/1');
        expect(habitRes.body.length).toEqual(1);

    });

    it('should reject habit deletion for id that does not exist', async () => {
        const res = await request(api)
            .delete('/habits')
            .send({
                id: 100
            })
        expect(res.statusCode).toEqual(404);
    });

    
    it('should update number of times completed for a given habit (streak should not change)', async () => {
        const res = await request(api)
            .patch('/habits')
            .send({
                id: 1,
                times_completed: 3,
                frequency_day: 5
            })

        expect(res.statusCode).toEqual(204);
        const habitRes = await request(api).get('/habits/1');
        expect(habitRes.body[habitRes.body.length - 1].times_completed).toEqual(3);
        expect(habitRes.body[habitRes.body.length - 1].streak).toEqual(15);

    });

    it('should update number of times completed for a given habit (streak should change)', async () => {
        const res = await request(api)
            .patch('/habits')
            .send({
                id: 2,
                times_completed: 5,
                frequency_day: 5
            })

        expect(res.statusCode).toEqual(204);
        const habitRes = await request(api).get('/habits/1');
        expect(habitRes.body[habitRes.body.length - 1].times_completed).toEqual(5);
        expect(habitRes.body[habitRes.body.length - 1].streak).toEqual(3)

    });


})