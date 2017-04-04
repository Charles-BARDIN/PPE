import { Room } from 'm2l-core';

import { IRoomDataAccess } from 'booking-server-lib';

import { Database } from '../common';

export class RoomDatabaseAdapter implements IRoomDataAccess {
  private _db: Database;

  constructor(config: { database: Database }) {
    this._db = config.database;
  }

  public getRooms(): Promise<Room[]> {
    return new Promise((resolve, reject) => {
      this._db.query(
        `SELECT *
        FROM room;`
      )
        .then(roomArray => {
          if (!roomArray.length) {
            reject('ERR_DB_ROOM_NOT_FOUND');
          }
          const rooms = roomArray
            .reduce((prev, curr) => {
              prev.push(new Room({
                id: curr.room_id,
                name: curr.room_label,
                image: curr.room_image,
                description: curr.room_description
              }));
              return prev;
            }, []);
          resolve(rooms);
          return;
        })
        .catch(err => {
          reject(err);
        })
    });
  }
}