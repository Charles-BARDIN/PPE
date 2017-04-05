import { Booking, Room, ILogger } from 'm2l-core';

import { IBookingDataAccess } from './ibooking-data-access.interface';

export class BookingService {
  private _logger: ILogger;
  private _data: IBookingDataAccess;

  constructor(config: {
    logger: ILogger,
    dataAccess: IBookingDataAccess
  }) {
    this._logger = config.logger;
    this._data = config.dataAccess;
  }

  public bookARoom(booking: {
    roomID: number,
    userID: number,
    date: Date
  }): Promise<Booking> {
    return new Promise((resolve, reject) => {
      this._data.get({ roomID: booking.roomID, date: booking.date })
        .then((bookings: Booking[]) => {
          if (bookings.length) {
            reject('ERR_ROOM_ALREADY_BOOKED');
            return;
          }

          let book = new Booking(booking);
          return this._data.add(book);
        })
        .then(resolve)
        .catch(err => {
          this._logger.error(err);
          reject('ERR_UNKNOWN');
        });
    })
  }

  public getBookings(filter: { roomID: number, date?: Date }): Promise<Booking[]> {
    return new Promise((resolve, reject) => {
      this._data.get({ roomID: filter.roomID, date: filter.date })
        .then(resolve)
        .catch(err => {
          this._logger.error(err);
          reject('ERR_UNKNOWN');
        });
    });
  }
}
