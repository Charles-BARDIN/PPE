import { Booking } from 'm2l-core';

export interface IBookingDataAccess {
  add(booking: Booking): Promise<Booking>;

  get(booking: { roomID: number, date?: Date }): Promise<Booking[]>;
}