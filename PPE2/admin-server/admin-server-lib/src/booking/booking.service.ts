import { Booking } from 'm2l-core';

export class BookingService {
  constructor() {

  }

  public cancelBooking(booking: Booking): Promise<boolean> {
    return new Promise((resolve, reject) => {

    });
  }

  public getAllBookings(): Promise<Booking[]> {
    return new Promise((resolve, reject) => {

    });
  }
}