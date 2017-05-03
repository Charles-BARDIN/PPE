import { Room, ILogger } from 'm2l-core';

import { IRoomDataAccess } from 'admin-server-lib';

import { Database } from '../common';


import * as mysql from 'mysql';
const escape = mysql.escape;

import * as fs from 'fs';
import * as path from 'path';

export class RoomSQLAdapter implements IRoomDataAccess {
  private _db: Database;
  private _logger: ILogger;

  constructor(config: { database: Database, logger: ILogger }) {
    this._db = config.database;
    this._logger = config.logger;
  }

  deleteRoom(id: number): Promise<boolean> {
    this._logger.debug('RoomSQLAdapter.deleteRoom: called with parameter', id);
    return new Promise((resolve, reject) => {
      let query = `SELECT COUNT(*) AS count
                  FROM booking
                  WHERE room_id=${id}
                  AND booking_date >= CURRENT_DATE;`;

      this._logger.debug('RoomSQLAdapter.deleteRoom: query', query);
      this._db.query(query)
        .then(res => {
          if (res[0].count !== 0) {
            this._logger.info('RoomSQLAdapter.deleteRoom: room booked', id);
            reject('ERR_ROOM_BOOKED');
            return;
          }

          query = `DELETE FROM booking
                  WHERE room_id=${id}
                  AND booking_date < CURRENT_DATE;`;

          this._logger.debug('RoomSQLAdapter.deleteRoom: query', query);
          return this._db.query(query);
        })
        .then(() => {
          query = `DELETE FROM room
                  WHERE room_id=${id};`;

          this._logger.debug('RoomSQLAdapter.deleteRoom: query', query);
          return this._db.query(query);
        })
        .then(() => {
          this._logger.debug('RoomSQLAdapter.deleteRoom: success', id);
          resolve(true);
        })
        .catch(reject);
    });
  }

  modifyRoom(room: Room): Promise<Room> {
    this._logger.debug('RoomSQLAdapter.modifyRoom: called with parameter', room);
    return new Promise((resolve, reject) => {
      let imageName;
      if (room.image) {
        this._logger.debug('RoomSQLAdapter.modifyRoom: room image set', room.image);
        imageName = `${room.id}_${room.name.toUpperCase()}.${room.image.ext.toUpperCase()}`;
        const base64Image = room.image.data;

        const writeResult = this._writeImage(base64Image, imageName);

        if (!writeResult.success) {
          this._logger.error('RoomSQLAdapter.modifyRoom: error while writing image', writeResult.error);
          reject(writeResult.error);
          return;
        }
        this._logger.debug('RoomSQLAdapter.modifyRoom: image written with success', imageName);
      }

      let query = `UPDATE room
                  SET room_label=${escape(this._escapeHtml(room.name))}, room_description=${escape(this._escapeHtml(room.description))}`;

      if (imageName) {
        query += `, room_image=${escape(imageName)} `;
      }

      query += `WHERE room_id=${room.id};`;
      this._logger.debug('RoomSQLAdapter.modifyRoom: query', query);

      this._db.query(query)
        .then(() => {
          query = `SELECT * FROM room WHERE room_id=${room.id}`;

          this._logger.debug('RoomSQLAdapter.modifyRoom: query', query);
          return this._db.query(query);
        })
        .then((rooms) => {
          if (!(rooms.length && rooms[0])) {
            this._logger.error('RoomSQLAdapter.modifyRoom: ERR_MODIFIED_ROOM_NOT_FOUND');
            reject('ERR_MODIFIED_ROOM_NOT_FOUND');
            return;
          }

          this._logger.debug('RoomSQLAdapter.modifyRoom: result', rooms);
          resolve(new Room({
            id: rooms[0].room_id,
            name: rooms[0].room_label,
            description: rooms[0].room_description
          }));
        })
        .catch(reject);
    });
  }

  addRoom(room: Room): Promise<Room> {
    this._logger.debug('RoomSQLAdapter.addRoom: called with parameter', room);
    return new Promise((resolve, reject) => {
      let imageName;
      if (room.image) {
        this._logger.debug('RoomSQLAdapter.addRoom: room image set', room.image);
        imageName = `${room.id}_${room.name.toUpperCase()}.${room.image.ext.toUpperCase()}`;
        const base64Image = room.image.data;

        const writeResult = this._writeImage(base64Image, imageName);

        if (!writeResult.success) {
          this._logger.error('RoomSQLAdapter.addRoom: error while writing image', writeResult.error);
          reject(writeResult.error);
          return;
        }

        this._logger.debug('RoomSQLAdapter.addRoom: image written with success', imageName);
      }

      let query = `INSERT INTO room (room_label, room_description${imageName ? ', room_image' : ''})
                  VALUES (${escape(this._escapeHtml(room.name))}, ${escape(this._escapeHtml(room.description))}${imageName ? ', ' + escape(this._escapeHtml(imageName)) : ''});`;

      this._logger.debug('RoomSQLAdapter.addRoom: query', query);
      this._db.query(query)
        .then(res => {
          query = `SELECT * FROM room WHERE room_id=${res.insertId}`;

          this._logger.debug('RoomSQLAdapter.addRoom: query', query);
          return this._db.query(query);
        })
        .then((rooms) => {
          if (!(rooms.length && rooms[0])) {
            this._logger.error('RoomSQLAdapter.addRoom: ERR_ADDED_ROOM_NOT_FOUND');
            reject('ERR_ADDED_ROOM_NOT_FOUND');
            return;
          }

          this._logger.debug('RoomSQLAdapter.addRoom: result', rooms);
          resolve(new Room({
            id: rooms[0].room_id,
            name: rooms[0].room_label,
            description: rooms[0].room_description
          }));
        })
        .catch(reject);
    });
  }

  getRooms(): Promise<Room[]> {
    this._logger.debug('RoomSQLAdapter.getRooms: called');
    return new Promise((resolve, reject) => {
      const query = `SELECT room_id, room_label, room_description
                    FROM room;`;

      this._logger.debug('RoomSQLAdapter.getRooms: query', query);
      this._db.query(query)
        .then(roomArray => {
          const rooms = roomArray
            .map(room => {
              return new Room({
                id: Number(room.room_id),
                name: this._unescapeHtml(room.room_label),
                description: this._unescapeHtml(room.room_description)
              });
            });

          this._logger.debug('RoomSQLAdapter.getRooms: result', roomArray);
          resolve(rooms);
          return;
        })
        .catch(reject);
    });
  }

  getRoomImage(id: number): Promise<{ ext: string, data: string }> {
    this._logger.debug('RoomSQLAdapter.getRoomImage: called with parameter', id);
    return new Promise((resolve, reject) => {
      const query = `SELECT room_image AS img FROM room WHERE room_id=${id}`;

      this._logger.debug('RoomSQLAdapter.getRoomImage: query', query);
      this._db.query(query)
        .then(roomImageName => {
          if (!roomImageName[0].img) {
            this._logger.debug('RoomSQLAdapter.getRoomImage: no image for room', id);
            reject('ERR_NO_ROOM');
            return;
          }

          fs.readFile(path.resolve(__dirname, '../../../../data/room_img', roomImageName[0].img), (error, bitmap) => {
            if (error) {
              this._logger.error('RoomSQLAdapter.getRoomImage:', error);
              reject(error);
              return;
            }

            let roomImageNameArray = roomImageName[0].img.split('.');
            const ext = roomImageNameArray[roomImageNameArray.length - 1];
            const data = new Buffer(bitmap).toString('base64');
            this._logger.debug('RoomSQLAdapter.getRoomImage: result', { ext, data });
            resolve({ ext, data });
          });
        })
        .catch(reject);
    });

  }

  private _writeImage(base64Image: string, name: string): { success: boolean, error?: string } {
    try {
      fs.writeFileSync(path.resolve(__dirname, '../../../../data/room_img', name), base64Image, 'base64');
    } catch (e) {
      return { success: false, error: e };
    }

    return { success: true };
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