import { Booking, Room } from 'm2l-core';

import { IBookingDataAccess } from '../app';

class BookingDatabaseAdapter implements IBookingDataAccess {
  constructor() { }

  public add(booking: Booking): Promise<Booking> {
    return new Promise((resolve, reject) => {

    });
  }

  public get(booking: { room: Room, date?: Date }): Promise<Booking[]> {
    return new Promise((resolve, reject) => {

    });
  }

  public remove(booking: Booking): Promise<boolean> {
    return new Promise((resolve, reject) => {

    });
  }
}

export { BookingDatabaseAdapter };