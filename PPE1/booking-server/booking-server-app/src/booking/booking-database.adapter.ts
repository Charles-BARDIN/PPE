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
      this._db.query(
        `INSERT INTO booking(booking_date, userID, roomID)
        VALUES (${booking.date}, ${booking.userID}, ${booking.roomID});`
      )
        .then(() => {
          resolve();
        })
        .catch(err => {
          reject();
        })
    });
  }

  public get(booking: { roomID: number, date?: Date }): Promise<Booking[]> {
    return new Promise((resolve, reject) => {
      this._db.query(
        `SELECT *
        FROM booking;`
      )
        .then(bookings => {
          let response = bookings
            .reduce((prev, curr) => {
              prev.push(new Booking(curr));
              return prev;
            }, []);
          resolve(response);
        })
        .catch(err => {
          reject();
        })
    });
  }
}