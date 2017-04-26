import { Room, ILogger } from 'm2l-core';
import { IRoomDataAccess } from '.';

export class RoomService {
  private _data: IRoomDataAccess;
  private _logger: ILogger;

  constructor(config: {
    dataAccess: IRoomDataAccess,
    logger: ILogger
  }) {
    this._data = config.dataAccess;
    this._logger = config.logger;
  }

  public deleteRoom(roomID: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this._data.deleteRoom(roomID)
        .then(result => {
          resolve(result);
        })
        .catch(errors => {
          this._logger.error(errors);
          reject('UNKNOWN_ERROR');
        })
    });
  }

  public modifyRoom(room: Room): Promise<Room> {
    return new Promise((resolve, reject) => {
      if (room.image) {
        let validation = this._checkImage(room.image);

        if (!(validation.valid)) {
          reject(validation.errors);
          return;
        }
      }

      this._data.modifyRoom(room)
        .then(modifiedRoom => {
          resolve(modifiedRoom);
        })
        .catch(errors => {
          this._logger.error(errors);
          reject('UNKNOWN_ERROR');
        });
    });
  }

  public addRoom(room: Room): Promise<Room> {
    return new Promise((resolve, reject) => {
      if (room.image) {
        let validation = this._checkImage(room.image);

        if (!(validation.valid)) {
          reject(validation.errors);
          return;
        }
      }

      this._data.addRoom(room)
        .then(addedRoom => {
          resolve(addedRoom);
        })
        .catch(errors => {
          this._logger.error(errors);
          reject('UNKNOWN_ERROR');
        });
    });
  }

  public getRoomImage(roomID: number): Promise<{
    ext: string,
    data: string
  }> {
    return new Promise((resolve, reject) => {
      this._data.getRoomImage(roomID)
        .then(image => {
          if (image && image.data && image.ext) {
            resolve(image);
            return;
          }

          reject('IMAGE_NOT_FOUND');
        })
        .catch(errors => {
          this._logger.error(errors);
          reject('UNKNOWN_ERROR');
        });
    });
  }

  public getAllRooms(): Promise<Room[]> {
    return new Promise((resolve, reject) => {
      this._data.getRooms()
        .then(rooms => {
          resolve(rooms);
        })
        .catch(errors => {
          this._logger.error(errors);
          reject('UNKNOWN_ERROR');
        })
    });
  }

  private _checkImage(image: { ext: string, data: string }): { valid: boolean, errors?: string[] } {
    if (!image) {
      return { valid: true };
    }

    let errors = [];
    if (['GIF', 'JPG', 'JPEG', 'PNG', 'PDF'].indexOf(image.ext.toUpperCase()) < 0) {
      errors.push('INVALID_IMAGE_EXTENSION');
    }

    if (!image.data) {
      errors.push('NO_IMAGE_FOUND');
    } else if (Buffer.byteLength(image.data) > 5e6) {
      errors.push('IMAGE_SIZE_LIMIT_EXCEEDED');
    }

    return { valid: errors.length === 0, errors };
  }
}
