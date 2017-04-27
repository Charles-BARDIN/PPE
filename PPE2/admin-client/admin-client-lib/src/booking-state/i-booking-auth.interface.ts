import { Booking } from 'm2l-core';

export interface IBookingAuth {
  userIsConnected(): boolean;
}