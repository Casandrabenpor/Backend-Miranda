import app from '../util/app';
import request from 'supertest';

describe('GET /info', () => {
  it('returns status code 200 if first name is passed', async () => {
    const res = await request(app).get('/info').send();

    // toEqual recursively checks every field of an object or array.
    expect(res.statusCode).toEqual(200);
  });

  it('returns 401 when call non authorized endpoint', async () => {
    const res = await request(app).get('/users').send();
    expect(res.statusCode).toEqual(401);
  });
});
