import { Booking } from 'm2l';

export interface IBookingCancelNavAccess {
    goTo(state: string): void;
    getRouteParameters(): Booking
}