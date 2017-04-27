import { ILogger, Admin } from 'm2l-core';

import { AdminService } from 'admin-server-lib';
import { AdminSQLAdapter } from '.';
import { Database } from '../common';

export class AdminAdapter {
  private _logger: ILogger;
  private _adminService: AdminService;

  constructor(config: { logger: ILogger, database: Database }) {
    const dataAccess = new AdminSQLAdapter({ logger: config.logger, database: config.database });

    this._adminService = new AdminService({ logger: config.logger, dataAccess });
    this._logger = config.logger;
  }

  public login(credentials: { mail: string, password: string }): Promise<Admin> {
    return new Promise((resolve, reject) => {
      this._adminService.login(credentials)
        .then(admin => {
          resolve(admin);
        })
        .catch(errors => {
          this._handleErrors(errors, reject);
        })
    });
  }

  public logout(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this._adminService.logout()
        .then(bool => {
          resolve(bool);
        })
        .catch(errors => {
          this._handleErrors(errors, reject);
        })
    });
  }

  private _handleErrors(errors, reject) {
    if (!Array.isArray(errors)) {
      errors = [errors];
    }

    reject(errors || []);
  }
}