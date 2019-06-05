const shell = require('shelljs');
const request = require('supertest');
const app = require('./app');

describe('api', () => {

  describe('Test GET /api/v1/olympians path', () => {
    test('should return all olympians with a 200 status', () => {
      return request(app).get('/api/v1/olympians').then(response => {
        expect(response.status).toBe(200);
        expect(response.body.olympians.length).toBeGreaterThan(3000);
        expect(typeof response.body.olympians[0].age).toBe('number');
        expect(typeof response.body.olympians[0].name).toBe('string');
        expect(typeof response.body.olympians[0].sport).toBe('string');
        expect(typeof response.body.olympians[0].team).toBe('string');
        expect(typeof response.body.olympians[0].total_medals_won).toBe('number');
      });
    });
  });

  describe('Test GET /api/v1/olympians?age=youngest path', () => {
    test('should return the youngest olympian with a 200 status', () => {
      return request(app).get('/api/v1/olympians?age=youngest').then(response => {
        expect(response.status).toBe(200);
        expect(response.body.olympian.age).toBe(13);
      });
    });
  });

  describe('Test GET /api/v1/olympians?age=oldest path', () => {
    test('should return the youngest olympian with a 200 status', () => {
      return request(app).get('/api/v1/olympians?age=oldest').then(response => {
        expect(response.status).toBe(200);
        expect(response.body.olympian.age).toBe(62);
      });
    });
  });

  describe('Test GET /api/v1/olympian_stats path', () => {
    test('should return olympian stats with a 200 status', () => {
      return request(app).get('/api/v1/olympian_stats').then(response => {
        expect(response.status).toBe(200);
        expect(response.body.olympian_stats.total_competing_olympians).toBeGreaterThan(3000);
        expect(typeof response.body.olympian_stats.average_weight.male_olympians).toBe('number');
        expect(typeof response.body.olympian_stats.average_weight.female_olympians).toBe('number');
        expect(typeof response.body.olympian_stats.average_age).toBe('number');
      });
    });
  });

  describe('Test GET /api/v1/events path', () => {
    test('should return all events grouped by sport with a 200 status', () => {
      return request(app).get('/api/v1/events').then(response => {
        expect(response.status).toBe(200);
        expect(typeof response.body[0].sport).toBe('string');
        expect(typeof response.body[0].events[0]).toBe('string');
      });
    });
  });

  describe('Test GET /api/v1/events/:id/medalists path', () => {
    test('should return all events grouped by sport with a 200 status', () => {
      return request(app).get('/api/v1/events/1/medalists').then(response => {
        expect(response.status).toBe(200);
        expect(typeof response.body.title).toBe('string');
        expect(typeof response.body.Medalists[0].name).toBe('string');
        expect(typeof response.body.Medalists[0].team).toBe('string');
        expect(typeof response.body.Medalists[0].age).toBe('number');
        expect(typeof response.body.Medalists[0].medal).toBe('string');
      });
    });
  });
});
