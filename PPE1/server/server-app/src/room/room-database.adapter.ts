import { Room } from 'm2l-core';

import { IRoomDataAccess } from 'server-lib';

export class RoomDatabaseAdapter implements IRoomDataAccess {
  constructor() { }

  public getRoom(id: number): Promise<Room> {
    return new Promise((resolve, reject) => {

    });
  }
}