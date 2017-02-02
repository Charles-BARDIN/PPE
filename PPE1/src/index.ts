import { Server } from './server';

import { LoggerAdapter } from './common';

const logger = new LoggerAdapter();

let server = new Server({ logger });
server.start();