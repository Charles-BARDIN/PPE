import { Room } from 'm2l-core';

import { IRoomDeleteNavAccess, IRoomDeleteGateway, IRoomDeleteController, IRoomDeleteAuthAccess, IRoomDeleteBooking } from '.';

export class RoomDeleteService {
  private _nav: IRoomDeleteNavAccess;
  private _gateway: IRoomDeleteGateway;
  private _controller: IRoomDeleteController;
  private _bookingState: IRoomDeleteBooking;
  private _room: Room;
  private _auth: IRoomDeleteAuthAccess;


  constructor(config: {
    navigation: IRoomDeleteNavAccess,
    gateway: IRoomDeleteGateway,
    authentification: IRoomDeleteAuthAccess,
    bookingService: IRoomDeleteBooking
  }) {
    this._nav = config.navigation;
    this._gateway = config.gateway;
    this._auth = config.authentification;
    this._bookingState = config.bookingService;

    this._room = {
      description: undefined,
      id: undefined,
      image: undefined,
      name: undefined
    };
  }

  public set controller(controller: IRoomDeleteController) {
    this._controller = controller;
  }

  get room(): Room {
    return this._room;
  }

  public onPageLoad() {
    if (!this._auth.userIsConnected()) {
      this._nav.goTo('login');
    }
    const room = this._nav.getRouteParameters();

    for (let key in room) {
      if (room[key]) this._room[key] = room[key];
    }
  }

  public onValidate() {
    this._gateway.deleteRoom(this._room)
      .then(res => {
        this._nav.goTo('rooms');
        this._bookingState.onPageLoad();
      })
      .catch(errors => {
        this._controller.displayBackendErrors(errors);
      });
  }

  public onCancel() {
    this._nav.goTo('rooms');
  }
}
