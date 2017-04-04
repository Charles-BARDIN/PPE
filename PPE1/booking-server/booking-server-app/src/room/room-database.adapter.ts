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
      this._db.query(
        `SELECT *
        FROM room
        WHERE room_id = ${id}`
      )
        .then(room => {
          if(room.length) {
            resolve(new Room(room[0]));
            return;
          }

          reject('ERR_DB_ROOM_NOT_FOUND');
        })
        .catch(err => {
          reject(err);
        })
    });
  }
}