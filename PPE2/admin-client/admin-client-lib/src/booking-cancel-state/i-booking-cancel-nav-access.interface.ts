import { Booking } from 'm2l-core';

export interface IBookingCancelNavAccess {
    goTo(state: string): void;
    getRouteParameters(): Booking
}