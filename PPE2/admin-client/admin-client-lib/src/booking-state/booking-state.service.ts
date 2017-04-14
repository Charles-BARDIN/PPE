import { Booking } from 'm2l-core';

import { IBookingNavAccess, IBookingController, IBookingGateway } from '.';

export class BookingService {
  private _nav: IBookingNavAccess
  private _controller: IBookingController;
  private _gateway: IBookingGateway;
  private _bookingList: Booking[];

  constructor(config: {
    navigation: IBookingNavAccess,
    gateway: IBookingGateway
  }) {
    this._nav = config.navigation;
    this._gateway = config.gateway;
  }

  set controller(controller: IBookingController) {
    this._controller = controller;
  }

  public onPageLoad() {
    this._gateway.getAllBookings()
      .then(bookings => {
        this._bookingList = bookings;
        this._controller.setBookingList(this._bookingList);
      })
      .catch(errors => {
        this._controller.setBackendErrors(errors);
      })
  }

  public onFilterClick(filter: {
    room?: number,
    mail?: string,
    date?: Date
  }) {
    this._bookingList = this._bookingList.reduce((prev, curr) => {
      let shouldBeAdded = true;

      if (filter.room && curr.roomID !== filter.room) {
        shouldBeAdded = false;
      }

      if (filter.mail && curr.userMail !== filter.mail) {
        shouldBeAdded = false;
      }

      if (filter.date && curr.date !== filter.date) {
        shouldBeAdded = false;
      }

      if (shouldBeAdded) prev.push(curr);

      return prev;
    }, []);

    this._controller.setBookingList(this._bookingList);
  }

  public onCancelClick(booking: Booking) {
    this._nav.goTo('cancel-booking', booking);
  }
}
