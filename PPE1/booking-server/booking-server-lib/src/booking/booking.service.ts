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
    this._logger.debug('BookingService.bookARoom: called with parameter', booking);
    return new Promise((resolve, reject) => {
      this._data.get({ roomID: booking.roomID, date: booking.date })
        .then((bookings: Booking[]) => {
          if (bookings.length) {
            this._logger.info('BookingService.bookARoom: ERR_ROOM_ALREADY_BOOKED', booking);
            reject('ERR_ROOM_ALREADY_BOOKED');
            return;
          }

          this._logger.debug(`BookingService.bookARoom: room ${booking.roomID} not taken`);
          let book = new Booking(booking);
          return this._data.add(book);
        })
        .then(resolve)
        .catch(err => {
          this._logger.error('BookingService.bookARoom:', err);
          reject('ERR_UNKNOWN');
        });
    })
  }

  public getBookings(filter: { roomID: number, date?: Date }): Promise<Booking[]> {
    this._logger.debug('BookingService.getBookings: called with parameter', filter);    
    return new Promise((resolve, reject) => {
      this._data.get({ roomID: filter.roomID, date: filter.date })
        .then(resolve)
        .catch(err => {
          this._logger.error('BookingService.getBookings:', err);
          reject('ERR_UNKNOWN');
        });
    });
  }
}
