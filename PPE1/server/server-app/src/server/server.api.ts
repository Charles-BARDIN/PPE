import { ILogger } from 'm2l-core';

import { RoomAdapter } from '../room';
import { BookingAdapter } from '../booking';
import { UserAdapter } from '../user';

import * as express from 'express';

export class Server {
  private _booking: BookingAdapter;
  private _room: RoomAdapter;
  private _user: UserAdapter;

  private _server: express.Application;

  constructor(config: { logger: ILogger }) {
    this._booking = new BookingAdapter({ logger: config.logger });
    this._room = new RoomAdapter({ logger: config.logger });
    this._user = new UserAdapter({ logger: config.logger });
    this._server = express();
  }

  public start() {

  }
}
