import { Room } from 'm2l-core';

import { IRoomDataAccess } from 'booking-server-lib';

import { Database } from '../common';

export class RoomDatabaseAdapter implements IRoomDataAccess {
  private _db: Database;

  constructor(config: { database: Database }) {
    this._db = config.database;
  }

  public getRoom(id: number): Promise<Room> {
    return new Promise((resolve, reject) => {

    });
  }
}