import { Room } from 'm2l-core';

export interface IRoomController {
  displayRoomDescription(room: Room): void
  displayRoomListError(err: string): void
  setRoomList(list: Room[]): void
}