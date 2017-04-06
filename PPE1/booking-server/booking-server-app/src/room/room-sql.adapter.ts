import { Room, ILogger } from 'm2l-core';

import { IRoomDataAccess } from 'booking-server-lib';

import { Database } from '../common';

import * as mysql from 'mysql';

const escape = mysql.escape;

export class RoomSQLAdapter implements IRoomDataAccess {
  private _db: Database;
  private _logger: ILogger;

  constructor(config: { database: Database, logger: ILogger }) {
    this._db = config.database;
    this._logger = config.logger;
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
            .map(room => new Room({
              id: Number(this._unescapeHtml(room.room_id.toString())),
              name: this._unescapeHtml(room.room_label),
              image: room.room_image ? this._unescapeHtml(room.room_image) : undefined,
              description: this._unescapeHtml(room.room_description)
            }));
          resolve(rooms);
          return;
        })
        .catch(err => {
          reject(err);
        })
    });
  }

  public getRoomImage(id: number): Promise<string> {
    return new Promise((resolve, reject) => {
      this._db.query(
        `SELECT room_image
        FROM room
        WHERE room_id = ${escape(this._escapeHtml(id.toString()))};`
      )
        .then(data => {
          resolve(data[0].room_image);
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
    return safe
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'");
  }
}