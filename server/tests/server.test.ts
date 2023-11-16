import app from '../index.js';
import Diary from '../models/diary.js'
import request from 'supertest';

describe('GET / - getAllDiaryEntries', () => {
    it('should return all diary entries', async () => {
        const sampleData = 
            {"__v": 0, 
            "_id": "6556493d98e49a5e51e726a6", 
            "createdAt": "2023-11-16T01:00:00.000Z", 
            "date": "2023-11-16T00:00:00.000Z", 
            "imageUrl": "https://example.com/image.jpg", 
            "tags": ["personal", "reflection"], 
            "text": "This is the content of the diary entry. It can be a longer piece of text.", 
            "title": "Sample Diary Entry"}
        ;
        // await Diary.insertMany(sampleData);
        const response = await request(app).get('/diary/entries');

        expect(response.status).toBe(200);
        expect(response.body).toContainEqual(sampleData);
    });

    it('should handle errors and return a 500 status', async () => {
        jest.spyOn(Diary, 'find').mockRejectedValueOnce(new Error('Some error'));
        const response = await request(app).get('/diary/entries');
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Internal server error' });
    });
});