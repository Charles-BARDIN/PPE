import { Room } from 'm2l-core';

import { IRoomGateway } from './i-room-gateway.interface';
import { IRoomController } from './i-room-controller.interface';

class RoomService {
  private _roomGateway: IRoomGateway;
  private _controller: IRoomController;

  constructor(config: {
    roomGateway: IRoomGateway,
    roomController: IRoomController
  }) {
    this._roomGateway = config.roomGateway;
  }

  public getRooms(): Promise<Room[]> {
    return this._roomGateway.getRooms();
  }

  public onRoomSelectionChange(newRoom: Room) {
    this._controller.displayRoomDescription(newRoom);
  }
}