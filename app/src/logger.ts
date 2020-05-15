import winston, { Logger } from 'winston';

const LOGGER_OUTPUT_DIR = 'log';
const LOGGER_FORMART = winston.format.json();

const appLogger = winston.createLogger({
  format: LOGGER_FORMART,
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'app.log', dirname: LOGGER_OUTPUT_DIR }),
  ],
});

const requestsLogger = winston.createLogger({
  format: LOGGER_FORMART,
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'requests.log', dirname: LOGGER_OUTPUT_DIR }),
  ],
});

function log(logger: Logger, level: string, message: any) {
  logger.log({
    level,
    message,
  });
}

export function print(message: any) {
  return log(appLogger, 'info', message);
}

export function printRequest(message: any) {
  return log(requestsLogger, 'info', message);
}

export const printRequestStream = {
  write(message: string) {
    printRequest(message);
  },
};
