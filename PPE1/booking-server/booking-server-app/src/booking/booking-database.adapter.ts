import { Booking } from 'm2l-core';

import { IBookingDataAccess } from 'booking-server-lib';

import { Database } from '../common';

export class BookingDatabaseAdapter implements IBookingDataAccess {
  private _db: Database;

  constructor(config: { database: Database }) {
    this._db = config.database;
  }

  public add(booking: Booking): Promise<Booking> {
    return new Promise((resolve, reject) => {
      const bookingDate = new Date(booking.date).toISOString().slice(0, 19).replace('T', ' ').split(' ')[0];
      this._db.query(
        `INSERT INTO booking(booking_date, user_id, room_id)
        VALUES ('${bookingDate}', '${booking.userID}', '${booking.roomID}');`
      )
        .then(() => {
          return this.get(booking);
        })
        .then(booking => {
          resolve(booking[0]);
        })
        .catch(err => {
          console.log(err)
          reject(err);
        })
    });
  }

  public get(booking: { roomID: number, date?: Date }): Promise<Booking[]> {
    return new Promise((resolve, reject) => {
      let query = `SELECT * FROM booking WHERE room_id = '${booking.roomID}'`;
      // http://stackoverflow.com/questions/20083807/javascript-date-to-sql-date-object
      query += booking.date ? ` AND booking_date = '${new Date(booking.date).toISOString().slice(0, 19).replace('T', ' ').split(' ')[0]}';` : `;`;
      
      this._db.query(query)
        .then(bookings => {
          let response = bookings
            .reduce((prev, curr) => {
              prev.push(new Booking(curr));
              return prev;
            }, []);
          resolve(response);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        })
    });
  }
}