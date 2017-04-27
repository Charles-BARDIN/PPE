import { ILogger, Admin } from 'm2l-core';

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

  private _handleErrors(errors, reject) {
    if (!Array.isArray(errors)) {
      errors = [errors];
    }

    reject(errors || []);
  }
}