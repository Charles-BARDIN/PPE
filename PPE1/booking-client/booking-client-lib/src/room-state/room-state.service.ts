import { Room } from 'm2l-core';

import { IRoomGateway } from '.';
import { IRoomController } from '.';

export class RoomService {
  private _gateway: IRoomGateway;
  private _controller: IRoomController;

  constructor(config: {
    gateway: IRoomGateway
  }) {
    this._gateway = config.gateway;
  }

  set controller(controller: IRoomController) {
    this._controller = controller;
  }

  public onPageLoad() {
    this._gateway.getRooms()
      .then(rooms => {
        this._controller.setRoomList(rooms);
      })
      .catch((err: string) => this._controller.displayRoomListError(err));
  }

  public changeRoomSelection(newRoom: Room) {
    this._controller.displayRoomDescription(newRoom);
  }
}