import { Booking } from 'm2l-core';

import { IBookingAuthAccess } from './i-booking-auth-access.interface';
import { IBookingGateway } from './i-booking-gateway.interface';
import { IBookingController } from './i-booking-controller.interface';

export class BookingService {
  private _auth: IBookingAuthAccess;
  private _gateway: IBookingGateway;
  private _controller: IBookingController;

  constructor(config: {
    authService: IBookingAuthAccess,
    roomGateway: IBookingGateway,
    controller: IBookingController
  }) {
    this._auth = config.authService;
    this._gateway = config.roomGateway;
    this._controller = config.controller;
  }

  public onPageLoad() {
    let rooms = this._gateway.getRooms()
      .then(rooms => {
        this._controller.setRoomList(rooms);
      })
      .catch((err: string) => this._controller.displayRoomListError(err));
  }

  public bookARoom(booking: {
    roomID: number,
    date: Date
  }) {
    let errors = [];

    if (!booking.roomID) {
      errors.push('ERR_BOOKING_ROOM_REQUIRED');
    }
    if (!booking.date) {
      errors.push('ERR_BOOKING_DATE_REQUIRED');
    }

    let tomorrow = new Date();
    tomorrow = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate() + 1, 0, 0, 0, 0);
    if (Number(booking.date) < Number(tomorrow)) {
      errors.push('ERR_BOOKING_DATE_PASSED');
    }

    if(!this._auth.userIsConnected()) {
      errors.push('ERR_BOOKING_USER_AUTH');
    }

    let book = new Booking({
      userID: this._auth.getUserID(),
      roomID: booking.roomID,
      date: booking.date
    })

    if (errors.length) {
      this._controller.showValidationErrors(errors);
      return;
    }

    this._gateway.bookARoom(book)
      .then(booking => {
        this._controller.showConfirmation();
      })
      .catch(err => {
        this._controller.showBackendError(err);
      })
  }
}