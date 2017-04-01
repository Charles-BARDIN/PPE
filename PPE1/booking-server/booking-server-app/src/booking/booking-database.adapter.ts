import { Booking } from 'm2l-core';

import { IBookingDataAccess } from 'booking-server-lib';

export class BookingDatabaseAdapter implements IBookingDataAccess {
  constructor() { }

  public add(booking: Booking): Promise<Booking> {
    return new Promise((resolve, reject) => {

    });
  }

  public get(booking: { roomID: number, date?: Date }): Promise<Booking[]> {
    return new Promise((resolve, reject) => {

    });
  }
}