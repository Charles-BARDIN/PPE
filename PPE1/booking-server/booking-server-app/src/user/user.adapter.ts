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
    firstname: string,
    lastname: string,
    mail: string,
    password: string,
    phone?: string,
    address: string,
    zip: string,
    town: string,
    country: string,
  }): Promise<User> {
    return new Promise((resolve, reject) => {

    });
  }

  remove(username: string): Promise<boolean> {
    return new Promise((resolve, reject) => {

    });
  }

  update(user: {
    id: number,
    firstname?: string,
    lastname?: string,
    mail?: string,
    password?: string,
    phone?: string,
    address?: string,
    zip?: string,
    town?: string,
    country?: string
  }): Promise<User> {
    return new Promise((resolve, reject) => {

    });
  }

  login(credentials: { mail: string, password: string }): Promise<User> {
    return new Promise((resolve, reject) => {

    });
  }
}
