const request = require('supertest');
const app = require('../src/app');

describe('API endpoints', () => {
  test('GET /health should return service status', async () => {
    const response = await request(app).get('/health');

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('ok');
    expect(response.body.service).toBe('devops-cloud-interview-preparation');
  });

  test('GET /api/status should return app metadata', async () => {
    const response = await request(app).get('/api/status');

    expect(response.statusCode).toBe(200);
    expect(response.body.app).toBe('DevOps Cloud Interview Preparation');
    expect(response.body.version).toBe('1.0.0');
  });

  test('GET /api/math/add should return arithmetic result', async () => {
    const response = await request(app).get('/api/math/add').query({ left: 10, right: 5 });

    expect(response.statusCode).toBe(200);
    expect(response.body.result).toBe(15);
  });

  test('POST /api/math/compute should support add operation', async () => {
    const response = await request(app)
      .post('/api/math/compute')
      .send({ operation: 'add', values: [1, 2, 3, 4] });

    expect(response.statusCode).toBe(200);
    expect(response.body.result).toBe(10);
  });

  test('POST /api/math/compute should return 400 for unsupported operation', async () => {
    const response = await request(app)
      .post('/api/math/compute')
      .send({ operation: 'divide', values: [10, 2] });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Unsupported operation.');
  });
});
