import request from 'supertest';
import app from '../index';
import Diary from '../models/diary'

describe('GET / - getAllDiaryEntries', () => {
    it('should return all diary entries', async () => {
        const sampleData = [
            {
                "title": "Sample Diary Entry",
                "text": "This is the content of the diary entry. It can be a longer piece of text.",
                "date": "2023-11-16",
                "createdAt": "2023-11-16T01:00:00.000Z",
                "imageUrl": "https://example.com/image.jpg",
                "tags": ["personal", "reflection"]
            }
        ];
        await Diary.insertMany(sampleData);
        const response = await request(app).get('/diary/entries');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(sampleData);
    });

    it('should handle errors and return a 500 status', async () => {
        jest.spyOn(Diary, 'find').mockRejectedValueOnce(new Error('Some error'));
        const response = await request(app).get('/diary/entries');
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Internal server error' });
    });
});