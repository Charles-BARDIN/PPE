export class Booking {
  private _roomID: number;
  private _user: string;
  private _date: Date;

  constructor(booking: {
    roomID: number,
    user: string,
    date: Date
  }) {
    this.roomID = booking.roomID;
    this.user = booking.user;
    this.date = booking.date;
  }

  public get roomID(): number {
    return this._roomID;
  }
  public set roomID(room: number) {
    this._roomID = room;
  }

  public get user(): string {
    return this._user;
  }
  public set user(user: string) {
    this._user = user;
  }

  public get date(): Date {
    return this._date;
  }
  public set date(date: Date) {
    this._date = date;
  }
}