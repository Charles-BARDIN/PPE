import { Room } from 'm2l-core';

export interface IRoomDataAccess {
  getRoom(id: number): Promise<Room>;
}
