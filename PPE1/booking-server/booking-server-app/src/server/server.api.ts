import { ILogger } from 'm2l-core';

import { RoomAdapter } from '../room';
import { BookingAdapter } from '../booking';
import { UserAdapter } from '../user';

import { Database } from '../common';

import * as express from 'express';

import * as bodyParser from 'body-parser';

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

    this._setApi();
  }

  public start() {
    this._server.listen(this._config.port, () => {
      this._logger.log(`Listening on ${this._config.port}...`);
    })
  }

  private _setApi() {
    this._server.use(bodyParser.json());

    this._server.post('/api/v1.0.0/login', (req, res) => {
      
    });

    this._server.post('/api/v1.0.0/logout', (req, res) => {

    });

    this._server.post('/api/v1.0.0/user', (req, res) => {

    });

    this._server.get('/api/v1.0.0/room', (req, res) => {

    });

    this._server.post('/api/v1.0.0/booking', (req, res) => {

    });

    this._server.put('/api/v1.0.0/user/:id', (req, res) => {

    });
  }
}
