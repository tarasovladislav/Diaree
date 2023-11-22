import request from 'supertest';
import mongoose from "mongoose";
import User from '../models/user.js';
import { tokenToUserId } from '../utils/userUtils.js';
import startServer from '../index.js';
import { Server } from 'http';


describe('/user/account endpoint', () => {

    let server: Server;

    // Open MongoDB connection and start the server
    beforeAll(async () => {
        server = await startServer();
        await User.findOneAndDelete({ username: 'TEST' });
        console.log('opening')
    });

    // Close MongoDB connection and stop the server
    afterAll(async () => {
        await User.findOneAndDelete({ username: 'TEST' });
        await mongoose.connection.close();
        server.close();
        console.log('closing')
    });

    const mockUser = { username: 'TEST', password: 'TEST' };

    it('should be able to create a user and get a token', async () => {
        const response = await request(server)
            .post('/user/account/register')
            .set('Content-Type', 'application/json')
            .send(mockUser);

        const data = await request(server)
            .get('/user/account')
            .set('Authorization', `${response.body.token}`)

        expect(response.status).toBe(201);
        expect(response.body.token).toBeTruthy();
        expect(data.status).toBe(200);
        expect(data.body).toBeTruthy();

    });

    it('should be able to log in ', async () => {
        const login = await request(server)
            .post('/user/account/login')
            .set('Content-Type', 'application/json')
            .send(mockUser);

        expect(login.status).toBe(200);
        expect(login.body.token).toBeTruthy();
    });

    // it('should be able to get user data', async () => {
    //     const user = await request(server)
    //         .post('/user/account/register')
    //         .set('Content-Type', 'application/json')
    //         .send(mockUser);

    //     expect(user.status).toBe(201);
    //     expect(user.body.token).toBeTruthy();

    //     const data = await request(server)
    //         .get('/user/account')
    //         .set('Authorization', `${user.body.token}`)

    //     expect(data.status).toBe(200);
    //     expect(data.body).toBeTruthy();
    // });
});
