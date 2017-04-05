import { Room } from 'm2l-core';

import { IRoomDataAccess } from 'booking-server-lib';

import { Database } from '../common';

import * as mysql from 'mysql';

const escape = mysql.escape;

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
                id: Number(this._unescapeHtml(curr.room_id)),
                name: this._unescapeHtml(curr.room_label),
                image: this._unescapeHtml(curr.room_image),
                description: this._unescapeHtml(curr.room_description)
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

  private _escapeHtml(unsafe: string): string {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  private _unescapeHtml(safe: string): string {
    console.log(safe)
    return safe
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'");
  }
}