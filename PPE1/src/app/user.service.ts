import { User, UserModel } from 'm2l-core';

import { ILogger } from '../common';

import { IUserDataAccess } from './iuser-data-access.interface';
import { IUserService } from './iuser-service.interface';

class UserService implements IUserService {
  private _logger: ILogger;
  private _data: IUserDataAccess;

  constructor(config: {
    logger: ILogger,
    dataAccess: IUserDataAccess
  }) {
    this._logger = config.logger;
    this._data = config.dataAccess;
  }

  public addUser(user_input: UserModel): Promise<UserModel> {
    return new Promise((resolve, reject) => {
      let user = Object.assign({}, user_input);

      user = new User(user);

      this._data.checkIfUserExists(user)
        .then((res: { mail_taken: boolean, username_taken: boolean }) => {
          if (res.mail_taken) {
            this._logger.log(`Mail ${user.mail} already taken`);
            reject(`Mail ${user.mail} already taken`);
            // TODO: check if this can cause issue for next Promise
            return;
          }

          if (res.username_taken) {
            this._logger.log(`Mail ${user.mail} already taken`);
            reject(`Mail ${user.mail} already taken`);
            // TODO: check if this can cause issue for next Promise
            return;
          }

          return this._data.add(user);
        })
        .then((user_data: UserModel) => {
          if (!user_data) {
            this._logger.error("An unknown error occured");
            reject("An unknown error occured");
            return;
          }

          resolve(user_data);
        })
        .catch((err: string) => {
          this._logger.error(err);
          reject(err);
        })
    });
  }

  public getUser(user: { username?: string, mail?: string }): Promise<UserModel> {
    return new Promise((resolve, reject) => {
      if (!user.username && !user.mail) {
        reject('You must provide a username or a mail');
        return;
      }

      this._data.get(user)
        .then((user: UserModel) => {
          if (!user) {
            reject('User not found');
            return;
          }

          resolve(user);
        })
    });
  }

  public updateUser(user_input: UserModel): Promise<UserModel> {
    return new Promise((resolve, reject) => {
      this._data.update(user_input)
        .then((user_data: UserModel) => {
          this._logger.log('User updated:', user_data);
          resolve(user_data);
        })
        .catch((err: string) => {
          this._logger.error(err);
          reject(err);
        })
    })
  }

  public removeUser(user_input: UserModel): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this._data.remove(user_input)
        .then((success: boolean) => {
          if (!success) {
            this._logger.error("Unknown error");
            reject("Unknown error");
          }

          resolve(`User ${user_input.username} removed with success`);
        })
        .catch((err: string) => {
          this._logger.error(err);
          reject(err);
        })
    })
  }
}

export { UserService };