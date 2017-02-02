import { Booking, Room } from 'm2l-core';

interface IBookingDataAccess {
  add(booking: Booking): Promise<Booking>;
  get(booking: { room: Room, date?: Date }): Promise<Booking[]>;
  remove(booking: Booking): Promise<boolean>;
}

export { IBookingDataAccess };