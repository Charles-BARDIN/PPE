import { Booking } from 'm2l-core';
import { IBookingCancelNavAccess, IBookingCancelGateway, IBookingCancelController, IBookingCancelAuth, IBookingCancelBooking } from '.';

export class BookingCancelService {
  private _auth: IBookingCancelAuth;
  private _nav: IBookingCancelNavAccess;
  private _gateway: IBookingCancelGateway;
  private _bookingState: IBookingCancelBooking;
  private _controller: IBookingCancelController;
  private _booking: Booking;

  constructor(config: {
    navigation: IBookingCancelNavAccess,
    gateway: IBookingCancelGateway,
    authentification: IBookingCancelAuth,
    bookingService: IBookingCancelBooking
  }) {
    this._nav = config.navigation;
    this._gateway = config.gateway;
    this._auth = config.authentification;
    this._bookingState = config.bookingService;

    this._booking = {
      date: undefined,
      roomID: undefined,
      roomName: undefined,
      userID: undefined,
      userMail: undefined
    };
  }

  set controller(controller: IBookingCancelController) {
    this._controller = controller;
  }

  get booking(): Booking {
    return this._booking;
  }

  public onPageLoad() {
    if (!this._auth.userIsConnected()) {
      this._nav.goTo('login');
    }

    const booking = this._nav.getRouteParameters();

    for (let key in booking) {
      if (booking[key]) this._booking[key] = booking[key];
    }
  }

  public onValidate() {
    this._gateway.cancelBooking(this._booking)
      .then(res => {
        this._nav.goTo('bookings');
        this._bookingState.onPageLoad();
      })
      .catch(errors => {
        this._controller.displayBackendErrors(errors);
      });
  }

  public onCancel() {
    this._nav.goTo('bookings');
  }
}