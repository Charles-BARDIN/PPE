import { User, ILogger } from 'm2l-core';

import { UserService, IUserService } from '../app';

import { IUserAccess } from './iuser-access.interface';
import { UserDatabaseAdapter } from './user-database.adapter';

export class UserAdapter implements IUserAccess {
  private _userService: IUserService;
  private _logger: ILogger;

  constructor(config: { logger: ILogger }) {
    const dataAccess = new UserDatabaseAdapter();

    this._userService = new UserService({ logger: config.logger, dataAccess });
    this._logger = config.logger;
  }

  add(user: {
    username: string,
    firstname: string,
    lastname: string,
    mail: string,
    phone: string,
    address: string,
    zip: string,
    town: string,
    country: string
  }): Promise<{ user: User, faults: string[] }> {
    return new Promise((resolve, reject) => {

    });
  }

  remove(username: string): Promise<{ user: User, faults: string[] }> {
    return new Promise((resolve, reject) => {

    });
  }

  update(user: {
    username: string,
    firstname?: string,
    lastname?: string,
    mail?: string,
    phone?: string,
    address?: string,
    zip?: string,
    town?: string,
    country?: string
  }): Promise<{ user: User, faults: string[] }> {
    return new Promise((resolve, reject) => {

    });
  }

  login(credentials: { username: string, password: string }): Promise<{ success: boolean, faults: string[] }> {
    return new Promise((resolve, reject) => {

    });
  }
}