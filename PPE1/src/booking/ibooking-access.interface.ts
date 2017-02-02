import { Booking } from 'm2l-core';

interface IBookingAccess {
  bookARoom(booking: Booking): Promise<{ booking: Booking, faults: string[] }>;
  cancelBooking(booking: Booking): Promise<{ success: boolean, faults: string[] }>;
  getBookings(query: { room: number, limit?: Date }): Promise<{ bookings: Booking[], faults: string[] }>;
}

export { IBookingAccess };