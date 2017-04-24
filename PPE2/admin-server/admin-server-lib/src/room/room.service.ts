import { Room, ILogger } from 'm2l-core';
import { IRoomDataAccess, IRoomRessourceAccess } from '.';

export class RoomService {
  private _data: IRoomDataAccess;
  private _ressources: IRoomRessourceAccess;
  private _logger: ILogger;

  constructor(config: {
    dataAccess: IRoomDataAccess,
    ressourceAccess: IRoomRessourceAccess,
    logger: ILogger
  }) {
    this._data = config.dataAccess;
    this._ressources = config.ressourceAccess;
    this._logger = config.logger;
  }

  public deleteRoom(roomID: number): Promise<boolean> {
    return new Promise((resolve, reject) => {

    });
  }

  public modifyRoom(room: Room): Promise<Room> {
    return new Promise((resolve, reject) => {

    });
  }

  public addRoom(room: Room): Promise<Room> {
    return new Promise((resolve, reject) => {

    });
  }

  public getRoomImage(roomID: number): Promise<{
    ext: string,
    data: string
  }> {
    return new Promise((resolve, reject) => {

    });
  }

  public getAllRooms(): Promise<Room[]> {
    return new Promise((resolve, reject) => {

    });
  }
}