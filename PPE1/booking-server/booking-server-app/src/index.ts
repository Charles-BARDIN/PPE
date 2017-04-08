import { ExpressServer } from './server';

import { LoggerAdapter } from 'm2l-node-logger';

import { Database } from './common';

const config = require('../config');

const logger = new LoggerAdapter(config.logger);
const database = new Database(config.database);

let server = new ExpressServer({
  logger,
  serverConfig: config.server,
  database
});

server.start();