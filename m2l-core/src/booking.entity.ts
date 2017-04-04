export class Booking {
  public roomID: number;
  public userID: number;
  public date: Date;

  constructor(booking: {
    roomID: number,
    userID: number,
    date: Date
  }) {
    this.roomID = booking.roomID;
    this.userID = booking.userID;
    this.date = booking.date;
  }
}