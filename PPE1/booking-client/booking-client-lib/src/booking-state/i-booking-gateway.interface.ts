import { Room, Booking } from 'm2l-core';

export interface IBookingGateway {
  getRooms(): Promise<Room[]>;
  bookARoom(booking: { roomID: number, date: Date, userID: number }): Promise<Booking>;
}