import { Booking, Room } from 'm2l-core';

export interface IBookingController {
    setBookingList(list: Booking[]): void;
    setBackendErrors(errors: string[]): void;
    setRoomList(list: Room[]): void;
}