import { Booking } from "m2l-core";

export interface IBookingNavAccess {
    goTo(state: string, data: Booking): void;
}