import { UserModel } from 'm2l-core';

import { UserService, IUserService } from '../app';
import { ILogger } from '../common';

import { IUserAccess } from './iuser-access.interface';
import { UserDatabaseAdapter } from './user-database.adapter';

class UserAdapter implements IUserAccess {
  private _userService: IUserService;
  private _logger: ILogger;

  constructor(config: { logger: ILogger }) {
    const dataAccess = new UserDatabaseAdapter();

    this._userService = new UserService({ logger: config.logger, dataAccess });
    this._logger = config.logger;
  }

  add(user: UserModel): Promise<{ user: User, faults: string[] }> {

  }

  remove(user: UserModel): Promise<{ user: User, faults: string[] }> {

  }

  update(user: UserModel): Promise<{ user: User, faults: string[] }> {

  }

  login(credentials: { username: string, password: string }): { success: boolean, faults: string[] } {

  }
}

export { UserAdapter };