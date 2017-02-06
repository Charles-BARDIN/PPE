import { Booking, Room } from 'm2l-core';

export interface IBookingService {
  bookARoom(booking: {
    roomID: number,
    user: string,
    date: Date
  }): Promise<Booking>;

  cancelBooking(booking: {
    roomID: number,
    user: string,
    date: Date
  }): Promise<boolean>;

  getBookings(filter: { roomID: number, date?: Date }): Promise<Booking[]>;
}