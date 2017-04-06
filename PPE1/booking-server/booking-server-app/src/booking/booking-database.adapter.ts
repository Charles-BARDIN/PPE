import { Booking, ILogger } from 'm2l-core';

import { IBookingDataAccess } from 'booking-server-lib';

import { Database } from '../common';

import * as mysql from 'mysql';

const escape = mysql.escape;

export class BookingDatabaseAdapter implements IBookingDataAccess {
  private _db: Database;
  private _logger: ILogger;

  constructor(config: { database: Database, logger: ILogger }) {
    this._db = config.database;
    this._logger = config.logger;
  }

  public add(booking: Booking): Promise<Booking> {
    return new Promise((resolve, reject) => {
      const bookingDate = new Date(booking.date).toISOString().slice(0, 19).replace('T', ' ').split(' ')[0];
      this._db.query(
        `INSERT INTO booking(booking_date, user_id, room_id)
        VALUES (${escape(this._escapeHtml(bookingDate))}, ${escape(this._escapeHtml(booking.userID.toString()))}, ${escape(this._escapeHtml(booking.roomID.toString()))});`
      )
        .then(() => {
          return this.get(booking);
        })
        .then(booking => {
          resolve(booking[0]);
        })
        .catch(err => {
          reject(err);
        })
    });
  }

  public get(booking: { roomID: number, date?: Date }): Promise<Booking[]> {
    return new Promise((resolve, reject) => {
      let query = `SELECT * FROM booking WHERE room_id = ${escape(this._escapeHtml(booking.roomID.toString()))}`;
      // http://stackoverflow.com/questions/20083807/javascript-date-to-sql-date-object
      query += booking.date ? ` AND booking_date = ${escape(this._escapeHtml(new Date(booking.date).toISOString().slice(0, 19).replace('T', ' ').split(' ')[0]))};` : `;`;

      this._db.query(query)
        .then(bookings => {
          let response = bookings
            .map(booking => new Booking(booking));
          resolve(response);
        })
        .catch(err => {
          reject(err);
        })
    });
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
}