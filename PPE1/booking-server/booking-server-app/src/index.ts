import { ExpressServer } from './server';

import { LoggerAdapter } from 'm2l-node-logger';

import { Database } from './common';

import * as config from './config';

const logger = new LoggerAdapter(config.loggerConfig);
const database = new Database(config.databaseConfig);

let server = new ExpressServer({
  logger,
  serverConfig: config.serverConfig,
  database
});

server.start();