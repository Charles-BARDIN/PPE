import { Booking } from 'm2l-core';

export interface IBookingAuthAccess {
  userIsConnected(): boolean;
}