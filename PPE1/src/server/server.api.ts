import { ILogger } from '../common';
import { RoomAdapter, IRoomAccess } from '../room';
import { BookingAdapter, IBookingAccess } from '../booking';
import { UserAdapter, IUserAccess } from '../user';

import { express } from 'express';

class Server {
  private _booking: IBookingAccess;
  private _room: IRoomAccess;
  private _user: IUserAccess;

  private _server: express;

  constructor(config: { logger: ILogger }) {
    this._booking = new BookingAdapter({ logger: config.logger });
    this._room = new RoomAdapter({ logger: config.logger });
    this._user = new UserAdapter({ logger: config.logger });
    this._server = express();
  }

  public start() {

  }
}

export { Server };