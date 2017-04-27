import { Booking } from 'm2l-core';

import { IBookingNavAccess, IBookingController, IBookingGateway, IBookingAuthAccess } from '.';

export class BookingService {
  private _nav: IBookingNavAccess
  private _controller: IBookingController;
  private _gateway: IBookingGateway;
  private _bookingList: Booking[];
  private _booking: Booking;
  private _auth: IBookingAuthAccess;

  constructor(config: {
    navigation: IBookingNavAccess,
    gateway: IBookingGateway,
    authentification: IBookingAuthAccess
  }) {
    this._nav = config.navigation;
    this._gateway = config.gateway;
    this._auth = config.authentification;
  }

  set controller(controller: IBookingController) {
    this._controller = controller;
  }

  public onPageLoad() {
    if (!this._auth.userIsConnected()) {
      this._nav.goTo('login');
    }
    this._gateway.getAllBookings()
      .then(bookings => {
        this._bookingList = bookings;
        this._controller.setBookingList(this._bookingList);

        return this._gateway.getAllRooms();
      })
      .then(rooms => {
        this._controller.setRoomList(rooms);
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
    this._controller.setBookingList(
      this._bookingList
        .filter(booking => {
          if (filter.room && booking.roomID !== filter.room) {
            return false;
          }

          if (filter.mail && !booking.userMail.includes(filter.mail)) {
            return false;
          }

          if (filter.date) {
            [booking.date, filter.date]
              .forEach(date => {
                date.setHours(0);
                date.setMinutes(0);
                date.setSeconds(0);
                date.setMilliseconds(0);
              });

            if (Number(booking.date) !== Number(filter.date)) {
              return false;
            }
          }

          return true;
        })
    );
  }
  public onCancelClick(booking: Booking) {
    this._nav.goTo('cancel-booking', booking);
  }
}
