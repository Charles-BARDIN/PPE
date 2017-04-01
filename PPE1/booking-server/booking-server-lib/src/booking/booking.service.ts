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
    // TODO: check user and room

    return new Promise((resolve, reject) => {
      this._data.get({ roomID: booking.roomID, date: booking.date })
        .then((bookings: Booking[]) => {
          if (bookings.length) {
            reject('This room is already booked for this date');
            return;
          }

          let book = new Booking(booking);

          return this._data.add(book);
        })
        .then(resolve)
        .catch(reject);
    })
  }

  public getBookings(filter: { roomID: number, date?: Date }): Promise<Booking[]> {
    // TODO: add limit ?
    return new Promise((resolve, reject) => {
      this._data.get({ roomID: filter.roomID, date: filter.date })
        .then(resolve)
        .catch(reject);
    });
  }
}
