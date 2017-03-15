import { Room } from 'm2l-core';

import { IRoomDataAccess } from '../lib';

export class RoomDatabaseAdapter implements IRoomDataAccess {
  constructor() { }

  public getRoom(id: number): Promise<Room> {
    return new Promise((resolve, reject) => {

    });
  }
}