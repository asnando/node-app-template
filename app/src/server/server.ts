import express, { Application as ExpressApplication } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import router from './router';
import getEnv from '../utils/env';
import { print, printRequestStream } from '../logger';

function createServer(serverPort: number = getEnv('SERVER_PORT', 8080)): Promise<ExpressApplication> {
  return new Promise((resolve, reject) => {
    const onServerUp = (() => {
      print(`Server up and running at ${serverPort} port.`);
      resolve(server);
    });

    const server: ExpressApplication = express();

    server
      .use(helmet())
      .use(cors())
      .use(morgan('tiny', { stream: printRequestStream }))
      .use(bodyParser.json())
      .use(router)
      .listen(serverPort, onServerUp);
  });
}

export default createServer;
