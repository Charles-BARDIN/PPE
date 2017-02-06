import { Booking } from 'm2l-core';

import { IBookingDataAccess } from '../app';

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

  public remove(booking: Booking): Promise<boolean> {
    return new Promise((resolve, reject) => {

    });
  }
}