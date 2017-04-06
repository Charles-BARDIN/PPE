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
    this._logger.debug(`RoomSQLAdapter.getRooms: called`);
    return new Promise((resolve, reject) => {
      const query = `SELECT *
                    FROM room;`;

      this._logger.debug('RoomSQLAdapter.getRooms: query:', query);

      this._db.query(query)
        .then(roomArray => {
          this._logger.debug('RoomSQLAdapter.getRooms: data:', roomArray);

          const rooms = roomArray
            .map(room => new Room({
              id: Number(this._unescapeHtml(room.room_id.toString())),
              name: this._unescapeHtml(room.room_label),
              image: room.room_image ? this._unescapeHtml(room.room_image) : undefined,
              description: this._unescapeHtml(room.room_description)
            }));

          this._logger.info('RoomSQLAdapter.getRooms: rooms', rooms);
          resolve(rooms);
          return;
        })
        .catch(reject);
    });
  }

  public getRoomImage(id: number): Promise<string> {
    this._logger.debug(`RoomSQLAdapter.getRoomImage: called with parameter ${id}`);
    return new Promise((resolve, reject) => {
      const query = `SELECT room_image
                    FROM room
                    WHERE room_id = ${escape(this._escapeHtml(id.toString()))};`;

      this._logger.debug('RoomSQLAdapter.getRoomImage: query:', query);

      this._db.query(query)
        .then(data => {
          this._logger.debug('RoomSQLAdapter.getRoomImage: data:', data);
          if (!(data && data.length)) {
            this._logger.info('RoomSQLAdapter.getRoomImage: room', id, 'image not found');
            resolve(undefined);
            return;
          }

          const image = data[0].room_image;
          this._logger.info(`RoomSQLAdapter.getRoomImage: room ${id} image: ${image}`);
          resolve(image);
        })
        .catch(reject);
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