import { User, ILogger } from 'm2l-core';

import { UserService } from 'booking-server-lib';

import { UserDatabaseAdapter } from './user-database.adapter';

import { Database } from '../common';

export class UserAdapter {
  private _userService: UserService;
  private _logger: ILogger;

  constructor(config: { logger: ILogger, database: Database }) {
    const dataAccess = new UserDatabaseAdapter({ database: config.database });

    this._userService = new UserService({ logger: config.logger, dataAccess });
    this._logger = config.logger;
  }

  add(user: {
    lastname: string,
    firstname: string,
    address: string,
    town: string,
    zip: string,
    country: string,
    mail: string,
    password: string,
    phone?: string
  }): Promise<User> {
    return new Promise((resolve, reject) => {
      this._userService.addUser(user)
        .then(user => {
          resolve(user);
        })
        .catch(errors => {
          this._handleErrors(errors, reject);
        });
    });
  }

  remove(id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {

    });
  }

  update(user: {
    id: number,
    address?: string,
    town?: string,
    zip?: string,
    country?: string,
    mail?: string,
    password?: string,
    oldPassword?: string,
    phone?: string
  }): Promise<User> {
    return new Promise((resolve, reject) => {
      this._userService.updateUser(user)
        .then(user => {
          resolve(user);
        })
        .catch(errors => {
          this._handleErrors(errors, reject);
        });
    });
  }

  login(credentials: { mail: string, password: string }): Promise<User> {
    return new Promise((resolve, reject) => {
      this._userService.login(credentials)
        .then(user => {
          resolve(user);
        })
        .catch(errors => {
          this._handleErrors(errors, reject);
        });
    });
  }

  private _handleErrors(errors, reject) {
    if (!Array.isArray(errors)) {
      errors = [errors];
    }

    reject(errors || []);
  }
}
