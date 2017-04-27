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
    return new Promise((resolve, reject) => {
      this._data.removeBooking(booking)
        .then(result => {
          resolve(result);
        })
        .catch(errors => {
          this._logger.error(errors);
          reject('ERR_UNKNOWN');
        })
    });
  }

  public getAllBookings(): Promise<Booking[]> {
    return new Promise((resolve, reject) => {
      this._data.getBookings()
        .then(bookingList => {
          resolve(bookingList);
        })
        .catch(errors => {
          this._logger.error(errors);
          reject('ERR_UNKNOWN');
        })
    });
  }
}
