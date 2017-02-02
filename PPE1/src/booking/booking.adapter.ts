import { Booking } from 'm2l-core';

import { BookingService, IBookingService } from '../app';
import { ILogger } from '../common';

import { BookingDatabaseAdapter } from './booking-database.adapter';
import { IBookingAccess } from './ibooking-access.interface';

class BookingAdapter implements IBookingAccess {
  private _bookingService: IBookingService;
  private _logger: ILogger;

  constructor(config: { logger: ILogger }) {
    const dataAccess = new BookingDatabaseAdapter();

    this._bookingService = new BookingService({ logger: config.logger, dataAccess });
    this._logger = config.logger;
  }

  public bookARoom(booking: Booking): Promise<{ booking: Booking, faults: string[] }> {

  }

  public cancelBooking(booking: Booking): Promise<{ success: boolean, faults: string[] }> {

  }

  public getBookings(query: { room: number, limit?: Date }): Promise<{ bookings: Booking[], faults: string[] }> {

  }
}

export { BookingAdapter };