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

    it('should create a user', async () => {
        const mockUser = { username: 'aassdd', password: 'sodaa123sdsdsi asddasdasdsosi' };

        const response = await request(app)
            .post('/user/account/register')
            .set('Content-Type', 'application/json')
            .send(mockUser);

        expect(response.status).toBe(201);
        expect(response.body.token).toBeTruthy();
        const user_id = tokenToUserId(response.body.token);        

        await User.findOneAndDelete({ user_id });
        await mongoose.connection.close();
    });
});