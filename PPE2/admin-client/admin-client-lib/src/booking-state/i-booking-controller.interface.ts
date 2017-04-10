import { Booking } from 'm2l-core';

export interface IBookingController {
    setBookingList(list: Booking[]): void;
    setBackendErrors(errors: string[]): void;
}