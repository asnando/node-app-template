import { Router as ExpressRouter } from 'express';
import indexController from './controllers/index';
import healthCheckController from './controllers/healthcheck';
import notFoundController from './controllers/notfound';

const router: ExpressRouter = ExpressRouter();

router
  .get('/', indexController)
  .get('/health', healthCheckController)
  .get('*', notFoundController);

export default router;
