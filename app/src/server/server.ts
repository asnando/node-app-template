import express, { Application as ExpressApplication } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import promBundle from 'express-prom-bundle';
import http, { Server } from 'http';
import createShutdownWrapper from 'http-shutdown';
import router from './router';
import getEnv from '../utils/env';
import { print, printRequestStream } from '../logger';

const metricsMiddleware = promBundle({
  includeMethod: true,
  includeStatusCode: true,
  includePath: true,
});

export interface IExpressApplicationWithShutdown extends Server {
  shutdown: Function,
};

function createServer(serverPort: number = getEnv('SERVER_PORT', 8080)): Promise<IExpressApplicationWithShutdown> {
  return new Promise((resolve, reject) => {
    const onServerUp = (() => {
      print(`Server up and running at ${serverPort} port.`);
    });

    const app: ExpressApplication = express();

    let server = http.createServer(app) as IExpressApplicationWithShutdown;
    server = createShutdownWrapper(server);

    app
      .use(helmet())
      .use(cors())
      .use(morgan('tiny', { stream: printRequestStream }))
      .use(bodyParser.json())
      .use(metricsMiddleware)
      .use(router);

    server
      .listen(serverPort, onServerUp);

    resolve(server);
  });
}

export default createServer;
