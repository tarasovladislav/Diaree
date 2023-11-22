import request from 'supertest';
import mongoose from "mongoose";
import User from '../models/user.js';
import * as utils from '../utils/userUtils';
import startServer from '../index.js';
import { Server } from 'http';


let server: Server;

const sampleData =
{
    title: 'Sample Diary Entry',
    text: 'This is the content of the diary entry. It can be a longer piece of text.',
    date: '2023-11-16',
    imageUrl: 'https://example.com/image.jpg',
    tags: [{ title: "test" }],
};

const updatedData =
{
    title: 'Sample Diary Entry testing',
    text: 'This is the content of the diary entry. It can be a longer piece of text.',
    date: '2023-11-16',
    imageUrl: 'https://example.com/image.jpg',
    tags: [{ title: "work" }],
};

// Open MongoDB connection and start the server
beforeAll(async () => {
    server = await startServer();
    await User.findOneAndDelete({ username: 'TEST' });
});

// Close MongoDB connection and stop the server
afterAll(async () => {
    // await User.findOneAndDelete({ username: 'TEST' });
    await mongoose.connection.close();
    server.close();
});

const loginfunc = async() => {
    const login = await request(server)
        .post('/user/account/login')
        .set('Content-Type', 'application/json')
        .send(mockUser);
    return login
}

const mockUser = { username: 'TEST', password: 'TEST' };
const updatedUser = { username: 'test1', password: 'TEST' }

describe('Creating and Logging in', () => {

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


});

describe('Diary Routes', () => {

    it('should add a dairy entry', async () => {

        const login = await loginfunc();

        const addEntryResponse = await request(server)
            .post('/diary/entries')
            .set({
                'Content-Type': 'application/json',
                'Authorization': `${login.body.token}`
            })
            .send(sampleData);

        expect(addEntryResponse.status).toBe(201);
    });

    it('should return all diary entries', async () => {

        const login = await loginfunc();

        const response = await request(server)
            .get('/diary/entries')
            .set('Authorization', `${login.body.token}`);

        const expectedResponse = response.body.map((entry: { title: any; text: any; date: any; imageUrl: any; tags: any; }) =>
            expect.objectContaining({
                title: entry.title,
                text: entry.text,
                date: entry.date,
                imageUrl: entry.imageUrl,
                tags: entry.tags,
            })
        );

        expect(response.status).toBe(200);
        expect(response.body).toEqual(expectedResponse);
    });

    it('should handle errors during user validation and return a 500 status', async () => {
        jest.spyOn(utils, 'validateUser').mockImplementationOnce(() => {
            throw new Error('Validation error');
        });

        const login = await loginfunc();

        const response = await request(server)
            .get('/diary/entries')
            .set('Authorization', `${login.body.token}`);

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Internal server error' });
    });

    it('should update an entry', async () => {

        const login = await loginfunc();

        const getEntry = await request(server)
            .get('/diary/entries')
            .set('Authorization', `${login.body.token}`);



        const response = await request(server)
            .put(`/diary/entries/${getEntry.body[0]._id}`)
            .set('Authorization', `${login.body.token}`)
            .send(updatedData);

        // console.log('response', response.body)

        const expectedResponse = expect.objectContaining({
            date: updatedData.date,
            imageUrl: updatedData.imageUrl,
            tags: expect.arrayContaining([
                expect.objectContaining({
                    title: updatedData.tags[0].title,
                }),
            ]),
            text: updatedData.text,
            title: updatedData.title,
        });

        expectedResponse._id = expect.any(String);

        expect(response.status).toBe(200);

        expect(response.body).toEqual(expectedResponse);
    });

    it('should delete an entry', async () => {

        const login = await loginfunc();

        const getEntry = await request(server)
            .get('/diary/entries')
            .set('Authorization', `${login.body.token}`);

        const response = await request(server)
            .delete(`/diary/entries/${getEntry.body[0]._id}`)
            .set('Authorization', `${login.body.token}`)


        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Diary entry deleted successfully' });

    });

    it('should handle errors and return a 404 status if entry not found', async () => {

        const login = await loginfunc();

        const response = await request(server)
            .delete('/diary/entries/507c7f79bcf86cd7994f6c0e')
            .set('Authorization', `${login.body.token}`);

        expect(response.status).toBe(404);
        console.log('we here:', response.body);
        expect(response.body).toEqual({ message: 'Diary entry not found' });
    });

});

describe('Updating User details', () => {

    it('should be able update ', async () => {
        const login = await loginfunc();

        const response = await request(server)
            .put('/user/account/update')
            .set('Authorization', `${login.body.token}`)
            .send(updatedUser);

        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
    });

});

