import winston, { Logger } from 'winston';

const LOGGER_FORMART = winston.format.json();

const appLogger = winston.createLogger({
  format: LOGGER_FORMART,
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'app.log' }),
  ],
});

const requestsLogger = winston.createLogger({
  format: LOGGER_FORMART,
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'requests.log' }),
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
  write: function(message: string) {
    printRequest(message);
  },
};
