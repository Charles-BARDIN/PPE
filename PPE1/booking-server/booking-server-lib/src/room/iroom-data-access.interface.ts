import { Room } from 'm2l-core';

export interface IRoomDataAccess {
  getRooms(): Promise<Room[]>;
  getRoomImage(id: number): Promise<string>;
}
