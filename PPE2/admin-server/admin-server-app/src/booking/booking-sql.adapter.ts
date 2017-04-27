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
    return new Promise((resolve, reject) => {
      let result = [];

      let query = `SELECT *
                  FROM booking;`;

      this._db.query(query)
        .then(bookingArray => {
          for (let i = 0; i < bookingArray.length; i++) {
            (function (i) {
              query = `SELECT room_label
                      FROM room
                      WHERE room_id = ${Number(escape(this._escapeHtml(bookingArray[i].room_id)))}`;

              this._db.query(query)
                .then(roomName => {
                  if (!(roomName.length && roomName[0])) {
                    reject('ROOM_DOES_NOT_EXIST');
                  }
                  bookingArray[i].roomName = this._unescapeHtml(roomName[0])

                  query = `SELECT user_mail
                            FROM user
                            WHERE user_id = ${Number(escape(this._escapeHtml(bookingArray[i].user_id)))}`;

                  this._db.query(query)
                    .then(usermail => {
                      if (!(usermail.length && usermail[0])) {
                        reject('USER_DOES_NOT_EXIST');
                      }

                      bookingArray[i].userMail = this._unescapeHtml(usermail[0]);

                      result.push(new Booking({
                        date: new Date(this._unescapeHtml(bookingArray[i].booking_date)),
                        roomID: Number(this._unescapeHtml(bookingArray[i].roomID)),
                        roomName: bookingArray[i].roomName,
                        userMail: bookingArray[i].userMail,
                        userID: Number(this._unescapeHtml(bookingArray[i].user_id))
                      }));

                      if (i === bookingArray.length - 1) {
                        resolve(result);
                      }
                    })
                    .catch(reject);
                })
                .catch(reject);
            })(i);
          }
        })
        .catch(reject);
    });
  }

  public removeBooking(booking: Booking): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const query = `DELETE
                    FROM booking
                    WHERE user_id = ${booking.userID} 
                    AND room_id = ${booking.roomID}`;

      this._db.query(query)
        .then(data => {
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
}