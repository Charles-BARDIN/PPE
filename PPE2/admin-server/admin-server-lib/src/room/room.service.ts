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
    this._logger.debug('RoomService.deleteRoom: called with parameter', roomID);
    return new Promise((resolve, reject) => {
      this._data.deleteRoom(roomID)
        .then(result => {
          this._logger.debug('RoomService.deleteRoom: success', roomID);
          resolve(result);
        })
        .catch(errors => {
          this._logger.error('RoomService.deleteRoom:', errors);
          reject(errors === 'ERR_ROOM_BOOKED' ? errors : 'ERR_UNKNOWN');
        });
    });
  }

  public modifyRoom(room: Room): Promise<Room> {
    this._logger.debug('RoomService.modifyRoom: called with parameter', room);
    return new Promise((resolve, reject) => {
      if (room.image) {
        let validation = this._checkImage(room.image);

        if (!(validation.valid)) {
          this._logger.info('RoomService.modifyRoom: invalid', validation.errors);
          reject(validation.errors);
          return;
        }
      }

      this._data.modifyRoom(room)
        .then(modifiedRoom => {
          this._logger.debug('RoomService.modifyRoom: success', modifiedRoom);
          resolve(modifiedRoom);
        })
        .catch(errors => {
          this._logger.error('RoomService.modifyRoom:', errors);
          reject('ERR_UNKNOWN');
        });
    });
  }

  public addRoom(room: Room): Promise<Room> {
    this._logger.debug('RoomService.addRoom: called with parameter', room);
    return new Promise((resolve, reject) => {
      if (room.image) {
        let validation = this._checkImage(room.image);

        if (!(validation.valid)) {
          this._logger.info('RoomService.addRoom: invalid', validation.errors);
          reject(validation.errors);
          return;
        }
      }

      this._data.addRoom(room)
        .then(addedRoom => {
          this._logger.debug('RoomService.addRoom: success', addedRoom);
          resolve(addedRoom);
        })
        .catch(errors => {
          this._logger.error('RoomService.addRoom:', errors);
          reject('ERR_UNKNOWN');
        });
    });
  }

  public getRoomImage(roomID: number): Promise<{
    ext: string,
    data: string
  }> {
    this._logger.debug('RoomService.getRoomImage: called with parameter', roomID);
    return new Promise((resolve, reject) => {
      this._data.getRoomImage(roomID)
        .then(image => {
          if (image && image.data && image.ext) {
            this._logger.debug('RoomService.getRoomImage: image found', image);
            resolve(image);
            return;
          }

          this._logger.info('RoomService.getRoomImage: image not found', roomID);
          reject('IMAGE_NOT_FOUND');
        })
        .catch(errors => {
          this._logger.error('RoomService.getRoomImage:', errors);
          reject('ERR_UNKNOWN');
        });
    });
  }

  public getAllRooms(): Promise<Room[]> {
    this._logger.debug('RoomService.getAllRooms: called');
    return new Promise((resolve, reject) => {
      this._data.getRooms()
        .then(rooms => {
          this._logger.debug('RoomService.getAllRooms: result', rooms);
          resolve(rooms);
        })
        .catch(errors => {
          this._logger.error('RoomService.getAllRooms:', errors);
          reject('ERR_UNKNOWN');
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
