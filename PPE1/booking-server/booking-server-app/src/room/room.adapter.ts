import { Room, ILogger } from "m2l-core";

import { RoomService } from 'booking-server-lib';

import { RoomDatabaseAdapter } from './room-database.adapter';

import { Database } from '../common';

export class RoomAdapter {
  private _roomService: RoomService;
  private _logger: ILogger;

  constructor(config: { logger: ILogger, database: Database }) {
    const dataAccess = new RoomDatabaseAdapter({ database: config.database });

    this._roomService = new RoomService({ logger: config.logger, dataAccess });
    this._logger = config.logger;
  }

  public get(): Promise<Room[]> {
    return new Promise((resolve, reject) => {
      this._roomService.getRooms()
        .then(rooms => {
          resolve(rooms);
        })
        .catch(errors => {
          this._handleErrors(errors, reject);
        });
    });
  }

  public getImageName(id: number): Promise<string> {
    return new Promise((resolve, reject) => {
      this._roomService.getImage(id)
        .then(imageName => {
          resolve(imageName);
        })
        .catch(errors => {
          this._handleErrors(errors, reject);
        });
    });
  }

  private _handleErrors(errors, reject) {
    if (!Array.isArray(errors)) {
      errors = [errors];
    }

    reject(errors || []);
  }
}
