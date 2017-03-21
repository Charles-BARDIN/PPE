import { ILogger } from 'm2l-core';

import { RoomAdapter } from '../room';
import { BookingAdapter } from '../booking';
import { UserAdapter } from '../user';

import * as express from 'express';

export class Server {
  private _booking: BookingAdapter;
  private _room: RoomAdapter;
  private _user: UserAdapter;

  private _logger: ILogger;

  private _server: express.Application;

  constructor(config: { logger: ILogger }) {
    this._booking = new BookingAdapter({ logger: config.logger });
    this._room = new RoomAdapter({ logger: config.logger });
    this._user = new UserAdapter({ logger: config.logger });

    this._logger = config.logger;

    this._server = express();
  }

  public start() {
    this._server.listen(9090, () => {
      this._logger.log('Listening on 9090...');
    })
  }
}
