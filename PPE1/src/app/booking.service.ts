import { Booking, Room } from 'm2l-core';

import { ILogger } from '../common';

import { IBookingDataAccess } from './ibooking-data-access.interface';
import { IBookingService } from './ibooking-service.interface';

class BookingService implements IBookingService {
  private _logger: ILogger;
  private _data: IBookingDataAccess;

  constructor(config: {
    logger: ILogger,
    dataAccess: IBookingDataAccess
  }) {
    this._logger = config.logger;
    this._data = config.dataAccess;
  }

  public bookARoom(booking: Booking): Promise<Booking> {
    return new Promise((resolve, reject) => {
      this._data.get({ room: booking.room, date: booking.date })
        .then((bookings: Booking[]) => {
          if (bookings.length) {
            reject('This room is already booked for this date');
            return;
          }

          return this._data.add(booking);
        })
        .then(resolve)
        .catch(reject);
    })
  }

  public cancelBooking(booking: Booking): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this._data.remove(booking)
        .then((success: boolean) => {
          if (!success) {
            this._logger.error("Unknown error");
            reject('Unknown error');
            return;
          }

          resolve(success);
        })
        .catch(reject);
    });
  }

  public getBookings(room: Room): Promise<Booking[]> {
    // TODO: add limit ?
    return new Promise((resolve, reject) => {
      this._data.get({ room })
        .then(resolve)
        .catch(reject);
    });
  }
}

export { BookingService };