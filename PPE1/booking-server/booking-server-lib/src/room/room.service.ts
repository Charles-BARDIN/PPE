import { Room, ILogger } from 'm2l-core';

import { IRoomDataAccess } from './iroom-data-access.interface';

export class RoomService {
  private _logger: ILogger;
  private _data: IRoomDataAccess;

  constructor(config: {
    logger: ILogger,
    dataAccess: IRoomDataAccess
  }) {
    this._logger = config.logger;
    this._data = config.dataAccess;
  }

  public getRooms(): Promise<Room[]> {
    this._logger.debug('RoomService.getRooms: called');
    return new Promise((resolve, reject) => {
      this._data.getRooms()
        .then(rooms => {
          if(!(rooms && rooms.length)) {
            this._logger.warn('RoomService.getRooms: no rooms found')
            reject('ERR_NO_ROOM_FOUND');
          }

          resolve(rooms);
        })
        .catch(err => {
          this._logger.error('RoomService.getRooms:', err);
          reject('ERR_UNKNOWN');
        });
    })
  }

  public getImage(id: number): Promise<string> {
    this._logger.debug('RoomService.getImage: called with id', id);
    return new Promise((resolve, reject) => {
      this._data.getRoomImage(id)
        .then(resolve)
        .catch(err => {
          this._logger.error('RoomService.getImage:', err);
          reject('ERR_UNKNOWN');
        });
    });
  }
}
