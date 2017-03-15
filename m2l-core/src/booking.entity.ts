export class Booking {
  private _roomID: number;
  private _userID: number;
  private _date: Date;

  constructor(booking: {
    roomID: number,
    userID: number,
    date: Date
  }) {
    this.roomID = booking.roomID;
    this.userID = booking.userID;
    this.date = booking.date;
  }

  public get roomID(): number {
    return this._roomID;
  }
  public set roomID(room: number) {
    this._roomID = room;
  }

  public get userID(): number {
    return this._userID;
  }
  public set userID(userID: number) {
    this._userID = userID;
  }

  public get date(): Date {
    return this._date;
  }
  public set date(date: Date) {
    this._date = date;
  }
}