import { Booking } from 'm2l-core';

import { IBookingDataAccess } from 'booking-server-lib';

import { Database } from '../common';

export class BookingDatabaseAdapter implements IBookingDataAccess {
  private _db: Database;

  constructor(config: { database: Database }) {
    this._db = config.database;
  }

  public add(booking: Booking): Promise<Booking> {
    return new Promise((resolve, reject) => {

    });
  }

  public get(booking: { roomID: number, date?: Date }): Promise<Booking[]> {
    return new Promise((resolve, reject) => {

    });
  }
}