import { ILogger, Booking } from 'm2l-core';

import { BookingService } from 'admin-server-lib';
import { BookingSQLAdapter } from '.';
import { Database } from '../common';

export class BookingAdapter {
  private _logger: ILogger;
  private _bookingService: BookingService;

  constructor(config: { logger: ILogger, database: Database }) {
    const dataAccess = new BookingSQLAdapter({ logger: config.logger, database: config.database });

    this._bookingService = new BookingService({ logger: config.logger, dataAccess });
    this._logger = config.logger;
  }

  public cancelBooking(booking: Booking): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this._bookingService.cancelBooking(booking)
        .then(success => {
          resolve(success);
        })
        .catch(errors => {
          this._handleErrors(errors, reject);
        })
    });
  }

  public getAllBookings(): Promise<Booking[]> {
    return new Promise((resolve, reject) => {
      this._bookingService.getAllBookings()
        .then(success => {
          resolve(success);
        })
        .catch(errors => {
          this._handleErrors(errors, reject);
        })
    });
  }

  private _handleErrors(errors, reject) {
    if (!Array.isArray(errors)) {
      errors = [errors];
    }

    reject(errors || []);
  }
}