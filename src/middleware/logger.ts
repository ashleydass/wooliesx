import { Router } from 'express';
import pino from 'pino';
import expressPino from 'express-pino-logger';

export default (router: Router) => {
  const logger = pino({ level: process.env.LOG_LEVEL || 'info' });
  const expressLogger = expressPino({ logger });
  router.use(expressLogger);
};
