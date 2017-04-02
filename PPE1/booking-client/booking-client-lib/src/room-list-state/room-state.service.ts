import { Room } from 'm2l-core';

import { IRoomGateway } from './i-room-gateway.interface';
import { IRoomController } from './i-room-controller.interface';

export class RoomService {
  private _roomGateway: IRoomGateway;
  private _controller: IRoomController;

  constructor(config: {
    roomGateway: IRoomGateway,
    roomController: IRoomController
  }) {
    this._roomGateway = config.roomGateway;
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