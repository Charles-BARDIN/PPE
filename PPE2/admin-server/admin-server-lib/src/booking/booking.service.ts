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

    });
  }

  public getAllBookings(): Promise<Booking[]> {
    return new Promise((resolve, reject) => {

    });
  }
}