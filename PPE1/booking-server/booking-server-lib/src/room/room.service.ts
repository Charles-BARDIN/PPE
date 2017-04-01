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

  public getRoom(id: number): Promise<Room> {
    return new Promise((resolve, reject) => {
      this._data.getRoom(id)
        .then(resolve)
        .catch(err => {
          this._logger.error(err);
          reject(err);
        });
    })
  }
}
