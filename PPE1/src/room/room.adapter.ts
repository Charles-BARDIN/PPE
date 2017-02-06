import { Room, ILogger } from "m2l-core";

import { RoomService, IRoomService } from '../app';

import { IRoomAccess } from './iroom-access.interface';
import { RoomDatabaseAdapter } from './room-database.adapter';

export class RoomAdapter implements IRoomAccess {
  private _roomService: IRoomService;
  private _logger: ILogger;

  constructor(config: { logger: ILogger }) {
    const dataAccess = new RoomDatabaseAdapter();

    this._roomService = new RoomService({ logger: config.logger, dataAccess });
    this._logger = config.logger;
  }

  public get(id: number): Promise<{ room: Room, faults: string[] }> {
    return new Promise((resolve, reject) => {

    });
  }
}