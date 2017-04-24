import { Admin, ILogger } from 'm2l-core';

import { IAdminDataAccess } from '.';

export class AdminService {
  private _data: IAdminDataAccess;
  private _logger: ILogger;

  constructor(config: {
    dataAccess: IAdminDataAccess,
    logger: ILogger
  }) {
    this._data = config.dataAccess;
    this._logger = config.logger;
  }

  public login(credentials: { mail: string, password: string }): Promise<boolean> {
    return new Promise((resolve, reject) => {

    });
  }

  public logout(): Promise<boolean> {
    return Promise.resolve(true);
  }
}