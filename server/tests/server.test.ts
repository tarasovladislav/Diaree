import request from 'supertest';
import router from '../router.js';
import cors from 'cors';
import express from 'express';
import mongoose from "mongoose";
import User from '../models/user.js';
import { tokenToUserId } from '../utils/userUtils.js';


(async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/diary");
})()
const app = express();
app.use(cors());
app.use(express.json());
app.use(router);


describe('/user/account endpoint', () => {
    const mockUser = { username: 'TEST', password: 'TEST' };


    it('should be able to create a user', async () => {
        await User.findOneAndDelete({ username: 'TEST' });
        const response = await request(app)
            .post('/user/account/register')
            .set('Content-Type', 'application/json')
            .send(mockUser);

        expect(response.status).toBe(201);
        expect(response.body.token).toBeTruthy();

        const user_id = tokenToUserId(response.body.token);

        await User.findOneAndDelete({ user_id });
    });

    it('should be able to log in', async () => {
        await User.findOneAndDelete({ username: 'TEST' });
        const user = await request(app)
            .post('/user/account/register')
            .set('Content-Type', 'application/json')
            .send(mockUser);

        const login = await request(app)
            .post('/user/account/login')
            .set('Content-Type', 'application/json')
            .send(mockUser);

        expect(user.status).toBe(201);
        expect(user.body.token).toBeTruthy();
        expect(login.status).toBe(200);
        expect(login.body.token).toBeTruthy();

        const user_id = tokenToUserId(login.body.token);

        await User.findOneAndDelete({ user_id });
    });

    it('should be able to get user data', async () => {
        await User.findOneAndDelete({ username: 'TEST' });
        const user = await request(app)
            .post('/user/account/register')
            .set('Content-Type', 'application/json')
            .send(mockUser);

        expect(user.status).toBe(201);
        expect(user.body.token).toBeTruthy();

        const data = await request(app)
            .get('/user/account')
            .set('Authorization', `${user.body.token}`)

        expect(data.status).toBe(200);
        expect(data.body).toBeTruthy();

        const user_id = tokenToUserId(login.body.token);

        await User.findOneAndDelete({ user_id });
    });
});

afterAll(async () => {
    await mongoose.connection.close();
})
