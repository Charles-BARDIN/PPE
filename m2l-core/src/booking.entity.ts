export class Booking {
  public roomID: number;
  public userID: number;
  public date: Date;
  public userMail?: string;
  public roomName?: string;

  constructor(booking: {
    roomID: number,
    userID: number,
    date: Date,
    userMail?: string,
    roomName?: string
  }) {
    this.roomID = booking.roomID;
    this.userID = booking.userID;
    this.date = booking.date;
    this.userMail = booking.userMail;
    this.roomName = booking.roomName;
  }
}
