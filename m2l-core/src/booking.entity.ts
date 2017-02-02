import { Room } from './room.entity';

class Booking {
  private _room: Room;
  private _user: string;
  private _date: Date;

  constructor(booking: {
    room: Room,
    user: string,
    date: Date
  }) {
    this.room = booking.room;
    this.user = booking.user;
    this.date = booking.date;
  }

  get room(): Room {
    return this._room;
  }
  set room(room: Room) {
    this._room = room;
  }

  get user(): string {
    return this._user;
  }
  set user(user: string) {
    this._user = user;
  }

  get date(): Date {
    return this._date;
  }
  set date(date: Date) {
    this._date = date;
  }
}

export { Booking };