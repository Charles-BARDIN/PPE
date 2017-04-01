import { Server } from './server';

import { LoggerAdapter } from 'm2l-node-logger';

import { Database } from './common';

import * as config from './config';

const logger = new LoggerAdapter();
const database = new Database(config.databaseConfig);

let server = new Server({ 
  logger, 
  serverConfig: config.serverConfig, 
  database 
});

server.start();