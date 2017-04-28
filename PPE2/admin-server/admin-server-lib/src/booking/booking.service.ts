import { Booking, ILogger } from 'm2l-core';

import { IBookingDataAccess } from '.';

export class BookingService {
  private _data: IBookingDataAccess;
  private _logger: ILogger;

  constructor(config: {
    dataAccess: IBookingDataAccess,
    logger: ILogger
  }) {
    this._data = config.dataAccess;
    this._logger = config.logger;
  }

  public cancelBooking(booking: Booking): Promise<boolean> {
    this._logger.debug('BookingService.cancelBooking: called with parameter', booking);
    return new Promise((resolve, reject) => {
      this._data.removeBooking(booking)
        .then(result => {
          this._logger.debug('BookingService.cancelBooking: success', booking);
          resolve(result);
        })
        .catch(errors => {
          this._logger.error('BookingService.cancelBooking:', errors);
          reject('ERR_UNKNOWN');
        })
    });
  }

  public getAllBookings(): Promise<Booking[]> {
    this._logger.debug('BookingService.getAllBookings: called');
    return new Promise((resolve, reject) => {
      this._data.getBookings()
        .then(bookingList => {
          this._logger.debug('BookingService.getAllBookings: result', bookingList);
          resolve(bookingList);
        })
        .catch(errors => {
          this._logger.error('BookingService.getAllBookings:', errors);          
          reject('ERR_UNKNOWN');
        })
    });
  }
}
