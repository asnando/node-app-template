import request, { Response } from 'supertest';
import createServer, { IExpressApplicationWithShutdown } from '../src/server/server';

let server: IExpressApplicationWithShutdown;

beforeAll(async () => {
  server = await createServer();
});

describe('Test server endpoints', () => {
  it('should get the index route', async () => {
    const res = await request(server).get('/');
    expect(res.status).toBe(200);
    expect(res.text).toBe('/');
  });

  it('should get the server health', async () => {
    const res = await request(server).get('/health');
    expect(res.status).toBe(200);
    expect(res.text).toBe('/health');
  });

  it('should get the pid where server is running in', async () => {
    const res = await request(server).get('/pid');
    expect(res.status).toBe(200);
    expect(typeof Number(res.text)).toBe('number');
  });

  it('should get the app version', async () => {
    const res = await request(server).get('/version');
    expect(res.status).toBe(200);
    expect(res.text).toMatch(/\d{1,}\.\d{1,}\.\d{1,}/);
  });
});

afterAll(async () => {
  server.shutdown();
});