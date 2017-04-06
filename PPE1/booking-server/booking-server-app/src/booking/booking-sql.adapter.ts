import { Booking, ILogger } from 'm2l-core';

import { IBookingDataAccess } from 'booking-server-lib';

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

  public add(booking: Booking): Promise<Booking> {
    this._logger.debug(`BookingSQLAdapter.add: called with parameter`, booking);
    return new Promise((resolve, reject) => {
      const bookingDate = this._getSQLDate(booking.date);
      const query = `INSERT INTO booking(booking_date, user_id, room_id)
                    VALUES (${escape(this._escapeHtml(bookingDate))}, ${escape(this._escapeHtml(booking.userID.toString()))}, ${escape(this._escapeHtml(booking.roomID.toString()))});`;

      this._logger.debug(`BookingSQLAdapter.add: query: ${query}`);

      this._db.query(query)
        .then(() => this.get(booking))
        .then(booking => {
          this._logger.debug(`BookingSQLAdapter.add: data:`, booking);

          if (!(booking.length && booking[0])) {
            this._logger.error(`BookingSQLAdapter.add: bookind added is not found`);
            reject('ERR_ADDED_BOOKING_NOT_FOUND');
            return;
          }

          const _booking = new Booking(booking[0]);
          this._logger.info(`BookingSQLAdapter.update: modified booking entity`, _booking);
          resolve(_booking);
        })
        .catch(reject);
    });
  }

  public get(booking: { roomID: number, date?: Date }): Promise<Booking[]> {
    this._logger.debug(`BookingSQLAdapter.get: called with parameter`, booking);
    return new Promise((resolve, reject) => {
      let query = `SELECT * FROM booking WHERE room_id = ${escape(this._escapeHtml(booking.roomID.toString()))}`;
      // http://stackoverflow.com/questions/20083807/javascript-date-to-sql-date-object
      query += booking.date ? ` AND booking_date = ${escape(this._escapeHtml(this._getSQLDate(booking.date)))};` : `;`;

      this._logger.debug(`BookingSQLAdapter.get: query: ${query}`);

      this._db.query(query)
        .then(bookings => {
          this._logger.debug(`BookingSQLAdapter.get: data:`, booking);

          let response = bookings
            .map(booking => new Booking(booking));

          if(response.length) {
            this._logger.info(`BookingSQLAdapter.get: booking entity array`, response);
          } else {
            this._logger.info('BookingSQLAdapter.get: no bookings found');
          }
          
          resolve(response);
        })
        .catch(reject);
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

  private _getSQLDate(date: Date): string {
    return new Date(date).toISOString().slice(0, 19).replace('T', ' ').split(' ')[0];
  }
}