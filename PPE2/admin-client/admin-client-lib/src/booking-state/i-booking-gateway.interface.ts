import { Booking, Room } from 'm2l-core';

export interface IBookingGateway {
    getAllBookings(): Promise<{ roomID: number, userID: number, mail: string, date: Date }[]>;
    getAllRooms(): Promise<Room[]>;
}