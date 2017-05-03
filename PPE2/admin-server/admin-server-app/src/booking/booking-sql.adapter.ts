import { Booking, ILogger } from 'm2l-core';

import { IBookingDataAccess } from 'admin-server-lib';

import { Database } from '../common';

import * as mysql from 'mysql';

const escape = mysql.escape;

export class BookingSQLAdapter implements IBookingDataAccess {
  private _db: Database;
  private _logger: ILogger;

  constructor(config: { database: Database, logger: ILogger }) {
    this._db = config.database;
    this._logger = config.logger;
  }

  public getBookings(): Promise<Booking[]> {
    this._logger.debug('BookingSQLAdapter.getBookings: called');
    return new Promise((resolve, reject) => {
      let result = [];

      let query = `SELECT booking_date, booking.user_id AS user_id, user_mail, booking.room_id AS room_id, room_label
                  FROM booking, room, user
                  WHERE booking.room_id = room.room_id
                  AND booking.user_id = user.user_id
                  AND booking_date >= CURRENT_DATE;`;

      this._logger.debug('BookingSQLAdapter.getBookings: query', query);
      this._db.query(query)
        .then(bookingArray => {
          this._logger.debug('BookingSQLAdapter.getBookings: result', bookingArray);
          resolve(bookingArray
            .map(dbBooking => new Booking({
              date: new Date(dbBooking.booking_date),
              roomID: Number(dbBooking.room_id),
              roomName: this._unescapeHtml(dbBooking.room_label),
              userID: Number(dbBooking.user_id),
              userMail: this._unescapeHtml(dbBooking.user_mail)
            })));
        })
        .catch(reject);
    });
  }

  public removeBooking(booking: Booking): Promise<boolean> {
    this._logger.debug('BookingSQLAdapter.removeBooking: called with parameter', booking);
    return new Promise((resolve, reject) => {
      const query = `DELETE
                    FROM booking
                    WHERE booking_date = ${escape(new Date(booking.date))} 
                    AND room_id = ${booking.roomID}`;

      this._logger.debug('BookingSQLAdapter.removeBooking: query', query);
      this._db.query(query)
        .then(data => {
          this._logger.debug('BookingSQLAdapter.removeBooking: data:', data);
          resolve(true);
        })
        .catch(reject);
    })
  }

  private _escapeHtml(unsafe: string): string {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  private _unescapeHtml(safe: string): string {
    return safe
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'");
  }

  private _getSQLDate(date: Date): string {
    return new Date(date).toISOString().slice(0, 19).replace('T', ' ').split(' ')[0];
  }
}