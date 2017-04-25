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
      if (!credentials) {
        reject('ADMIN_LOGIN_REQUIRED_CREDENTIALS');
      }
      let errors = [];

      if (!credentials.mail) {
        errors.push('ADMIN_LOGIN_REQUIRED_MAIL');
      }

      if (!credentials.password) {
        errors.push('ADMIN_LOGIN_REQUIRED_PASSWORD');
      }

      if (errors.length) {
        reject(errors);
        return;
      }

      this._data.getAdminByCredentials(credentials)
        .then(admin => {
          if (!admin) {
            reject('INVALID_CREDENTIALS');
            return;
          }

          resolve(admin);
        })
        .catch(errors => {
          this._logger.error(errors);
          reject('UNKNOWN_ERROR');
        })
    });
  }

  public logout(): Promise<boolean> {
    return Promise.resolve(true);
  }
}