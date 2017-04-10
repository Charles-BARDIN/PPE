import { Booking } from 'm2l-core';

export interface IBookingCancelGateway {
    cancelBooking(booking: Booking): Promise<boolean>;
}