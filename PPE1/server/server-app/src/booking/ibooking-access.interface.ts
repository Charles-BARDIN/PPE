import { Booking } from 'm2l-core';

export interface IBookingAccess {
  bookARoom(booking: {
    roomID: number,
    user: string,
    date: Date
  }): Promise<{ booking: Booking, faults: string[] }>;

  cancelBooking(booking: {
    roomID: number,
    user: string,
    date: Date
  }): Promise<{ success: boolean, faults: string[] }>;
  
  getBookings(query: { room: number, limit?: Date }): Promise<{ bookings: Booking[], faults: string[] }>;
}