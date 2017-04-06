import { ILogger } from 'm2l-core';

import { RoomAdapter } from '../room';
import { BookingAdapter } from '../booking';
import { UserAdapter } from '../user';

import { Database } from '../common';

import { ExpressApi } from './express.api';

import * as express from 'express';

export class ExpressServer {
  private _router: ExpressApi;

  private _logger: ILogger;

  private _server: express.Application;
  private _config: {
    port: string,
    roomImageRoot: string
  };

  constructor(config: {
    logger: ILogger, serverConfig: { port: string, roomImageRoot: string }, database: Database
  }) {
    const booking = new BookingAdapter({ logger: config.logger, database: config.database });
    const room = new RoomAdapter({ logger: config.logger, database: config.database });
    const user = new UserAdapter({ logger: config.logger, database: config.database });

    this._router = new ExpressApi({
      booking,
      room,
      user,
      config: config.serverConfig,
      logger: config.logger
    });

    this._logger = config.logger;

    this._server = express();
    this._config = config.serverConfig;

    this._setApi();
  }

  public start() {
    this._server.listen(this._config.port, () => {
      this._logger.log(`ExpressServer server started on ${this._config.port}...`);
    })
  }

  private _setApi() {
    this._server.use('/api/v1.0.0', this._router.expressRouter);
  }
}
