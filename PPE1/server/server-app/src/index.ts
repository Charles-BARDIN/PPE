import { Server } from './server';

import { LoggerAdapter } from 'm2l-node-logger';

const logger = new LoggerAdapter();

let server = new Server({ logger });
server.start();