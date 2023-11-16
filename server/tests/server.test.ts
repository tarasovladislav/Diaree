import request from 'supertest';
import app from '../index'; // Import your server app

describe('Server Tests', () => {
  it('should return "Hello, World!"', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello, World!');
  });
});