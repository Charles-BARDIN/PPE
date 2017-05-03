import { ILogger, Room } from 'm2l-core';

import { RoomService } from 'admin-server-lib';
import { RoomSQLAdapter } from '.';
import { Database } from '../common';

export class RoomAdapter {
  private _logger: ILogger;
  private _roomService: RoomService;

  constructor(config: { logger: ILogger, database: Database }) {
    const dataAccess = new RoomSQLAdapter({ logger: config.logger, database: config.database });

    this._roomService = new RoomService({ logger: config.logger, dataAccess });
    this._logger = config.logger;
  }

  public deleteRoom(roomID: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this._roomService.deleteRoom(roomID)
        .then(data => {
          resolve(data);
        })
        .catch(errors => {
          this._handleErrors(errors, reject);
        });
    })
  }

  public modifyRoom(room: Room): Promise<Room> {
    return new Promise((resolve, reject) => {
      this._roomService.modifyRoom(room)
        .then(data => {
          resolve(data);
        })
        .catch(errors => {
          this._handleErrors(errors, reject);
        });
    })
  }

  public addRoom(room: Room): Promise<Room> {
    return new Promise((resolve, reject) => {
      this._roomService.addRoom(room)
        .then(data => {
          resolve(data);
        })
        .catch(errors => {
          this._handleErrors(errors, reject);
        });
    })
  }

  public getRoomImage(roomID: number): Promise<{ ext: string, data: string }> {
    return new Promise((resolve, reject) => {
      this._roomService.getRoomImage(roomID)
        .then(data => {
          resolve(data);
        })
        .catch(errors => {
          this._handleErrors(errors, reject);
        });
    })
  }

  public getAllRooms(): Promise<Room[]> {
    return new Promise((resolve, reject) => {
      this._roomService.getAllRooms()
        .then(data => {
          resolve(data);
        })
        .catch(errors => {
          this._handleErrors(errors, reject);
        });
    })
  }

  private _handleErrors(errors, reject) {
    if (!Array.isArray(errors)) {
      errors = [errors];
    }

    reject(errors || []);
  }
}