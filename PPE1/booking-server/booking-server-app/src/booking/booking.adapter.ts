import { Booking, ILogger } from 'm2l-core';

import { BookingService } from 'booking-server-lib';

import { BookingDatabaseAdapter } from './booking-database.adapter';

import { Database } from '../common';

export class BookingAdapter {
  private _bookingService: BookingService;
  private _logger: ILogger;

  constructor(config: { logger: ILogger, database: Database }) {
    const dataAccess = new BookingDatabaseAdapter({ database: config.database });

    this._bookingService = new BookingService({ logger: config.logger, dataAccess });
    this._logger = config.logger;
  }

  public bookARoom(booking: {
    roomID: number,
    userID: number,
    date: Date
  }): Promise<Booking> {
    return new Promise((resolve, reject) => {

    });
  }

  public cancelBooking(booking: {
    roomID: number,
    userID: number,
    date: Date
  }): Promise<boolean> {
    return new Promise((resolve, reject) => {

    });
  }

  public getBookings(query?: { roomID: number, limit?: Date }): Promise<Booking[]> {
    return new Promise((resolve, reject) => {

    });
  }
}
