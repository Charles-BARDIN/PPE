import { Booking, ILogger } from 'm2l-core';

import { BookingService } from 'server-lib';

import { BookingDatabaseAdapter } from './booking-database.adapter';

export class BookingAdapter {
  private _bookingService: BookingService;
  private _logger: ILogger;

  constructor(config: { logger: ILogger }) {
    const dataAccess = new BookingDatabaseAdapter();

    this._bookingService = new BookingService({ logger: config.logger, dataAccess });
    this._logger = config.logger;
  }

  public bookARoom(booking: {
    roomID: number,
    user: string,
    date: Date
  }): Promise<{ booking: Booking, faults: string[] }> {
    return new Promise((resolve, reject) => {

    });
  }

  public cancelBooking(booking: {
    roomID: number,
    user: string,
    date: Date
  }): Promise<{ success: boolean, faults: string[] }> {
    return new Promise((resolve, reject) => {

    });
  }

  public getBookings(query: { room: number, limit?: Date }): Promise<{ bookings: Booking[], faults: string[] }> {
    return new Promise((resolve, reject) => {

    });
  }
}
