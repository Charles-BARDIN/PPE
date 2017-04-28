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
    this._logger.debug('AdminService.login: called with parameter', credentials);
    return new Promise((resolve, reject) => {
      if (!credentials) {
        this._logger.info('AdminService.login: ADMIN_LOGIN_REQUIRED_CREDENTIALS');
        reject('ADMIN_LOGIN_REQUIRED_CREDENTIALS');
      }
      let errors = [];

      if (!credentials.mail) {
        this._logger.info('AdminService.login: ADMIN_LOGIN_REQUIRED_MAIL', credentials);
        errors.push('ADMIN_LOGIN_REQUIRED_MAIL');
      }

      if (!credentials.password) {
        this._logger.info('AdminService.login: ADMIN_LOGIN_REQUIRED_PASSWORD', credentials);
        errors.push('ADMIN_LOGIN_REQUIRED_PASSWORD');
      }

      if (errors.length) {
        reject(errors);
        return;
      }

      this._data.getAdminByCredentials(credentials)
        .then(admin => {
          if (!admin) {
            this._logger.info('AdminService.login: INVALID_CREDENTIALS', credentials);
            reject('INVALID_CREDENTIALS');
            return;
          }

          this._logger.debug('AdminService.login: login success', admin);
          resolve(admin);

        })
        .catch(errors => {
          this._logger.error('AdminService.login:', errors);
          reject('ERR_UNKNOWN');
        })
    });
  }

  public logout(): Promise<boolean> {
    this._logger.debug('AdminService.logout: called');
    return Promise.resolve(true);
  }
}