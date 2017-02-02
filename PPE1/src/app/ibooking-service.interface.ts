import { Booking, Room } from 'm2l-core';

interface IBookingService {
  bookARoom(booking: Booking): Promise<Booking>;
  cancelBooking(booking: Booking): Promise<boolean>;
  getBookings(room: Room): Promise<Booking[]>;
}

export { IBookingService };