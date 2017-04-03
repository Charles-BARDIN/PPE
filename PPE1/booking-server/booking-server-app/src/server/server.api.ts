import { ILogger } from 'm2l-core';

import { RoomAdapter } from '../room';
import { BookingAdapter } from '../booking';
import { UserAdapter } from '../user';

import { Database } from '../common';

import * as express from 'express';

export class Server {
  private _booking: BookingAdapter;
  private _room: RoomAdapter;
  private _user: UserAdapter;

  private _logger: ILogger;

  private _server: express.Application;
  private _config: { port: string };

  constructor(config: {
    logger: ILogger, serverConfig: { port: string }, database: Database
  }) {
    this._booking = new BookingAdapter({ logger: config.logger, database: config.database });
    this._room = new RoomAdapter({ logger: config.logger, database: config.database });
    this._user = new UserAdapter({ logger: config.logger, database: config.database });

    this._logger = config.logger;

    this._server = express();
    this._config = config.serverConfig;
  }

  public start() {
    this._setApi();
    this._server.listen(this._config.port, () => {
      this._logger.log(`Listening on ${this._config.port}...`);
    })
  }

  private _setApi() {
    this._server.post('/login', (req, res) => {

    });

    this._server.post('/logout', (req, res) => {
      
    });

    this._server.post('/user', (req, res) => {
      
    });

    this._server.get('/room', (req, res) => {
      
    });

    this._server.post('/booking', (req, res) => {
      
    });

    this._server.put('/user/:id', (req, res) => {
      
    });
  }
}
