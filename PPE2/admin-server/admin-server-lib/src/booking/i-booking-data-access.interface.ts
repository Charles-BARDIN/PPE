import { Booking } from 'm2l-core';

export interface IBookingDataAccess {
  getBookings(): Promise<Booking[]>;
  removeBooking(booking: Booking): Promise<boolean>;
}