import { Room } from 'm2l-core';

import { IRoomGateway } from '.';
import { IRoomController } from '.';

export class RoomService {
  private _roomGateway: IRoomGateway;
  private _controller: IRoomController;

  constructor(config: {
    gateway: IRoomGateway,
    controller: IRoomController
  }) {
    this._roomGateway = config.gateway;
    this._controller = config.controller;
  }

  public onPageLoad() {
    this._roomGateway.getRooms()
      .then(rooms => {
        this._controller.setRoomList(rooms);
      })
      .catch((err: string) => this._controller.displayRoomListError(err));
  }

  public changeRoomSelection(newRoom: Room) {
    this._controller.displayRoomDescription(newRoom);
  }
}