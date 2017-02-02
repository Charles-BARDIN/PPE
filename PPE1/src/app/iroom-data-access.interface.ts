import { Room } from 'm2l-core';

interface IRoomDataAccess {
  getRoom(id: number): Promise<Room>;
}

export { IRoomDataAccess };