import { User, ILogger } from 'm2l-core';

import { IUserDataAccess } from './iuser-data-access.interface';
import { IUserService } from './iuser-service.interface';

export class UserService implements IUserService {
  private _logger: ILogger;
  private _data: IUserDataAccess;

  constructor(config: {
    logger: ILogger,
    dataAccess: IUserDataAccess
  }) {
    this._logger = config.logger;
    this._data = config.dataAccess;
  }

  public addUser(user_input: {
    username: string,
    firstname: string,
    lastname: string,
    mail: string,
    phone: string,
    address: string,
    zip: string,
    town: string,
    country: string
  }): Promise<User> {
    return new Promise((resolve, reject) => {
      let user_model = {
        username: user_input.username,
        firstname: user_input.firstname,
        lastname: user_input.lastname,
        mail: user_input.mail,
        phone: user_input.phone,
        address: user_input.address,
        zip: user_input.zip,
        town: user_input.town,
        country: user_input.country
      }

      let user = new User(user_model);

      this._data.checkIfUserExists(user)
        .then((res: { mail_taken: boolean, username_taken: boolean }) => {
          if (res.mail_taken) {
            this._logger.log(`Mail ${user.mail} already taken`);
            reject(`Mail ${user.mail} already taken`);
            // TODO: check if this can cause issue for next Promise
            return;
          }

          if (res.username_taken) {
            this._logger.log(`Username ${user.username} already taken`);
            reject(`Username ${user.username} already taken`);
            // TODO: check if this can cause issue for next Promise
            return;
          }

          return this._data.add(user);
        })
        .then((user_data: User) => {
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

  public getUser(user: { username?: string, mail?: string }): Promise<User> {
    return new Promise((resolve, reject) => {
      if (!user.username && !user.mail) {
        reject('You must provide a username or a mail');
        return;
      }

      this._data.get(user)
        .then((user: User) => {
          if (!user) {
            reject('User not found');
            return;
          }

          resolve(user);
        })
    });
  }

  public updateUser(user_input: {
    username: string,
    firstname?: string,
    lastname?: string,
    mail?: string,
    phone?: string,
    address?: string,
    zip?: string,
    town?: string,
    country?: string
  }): Promise<User> {
    return new Promise((resolve, reject) => {
      this._data.update(user_input)
        .then((user_data: User) => {
          this._logger.log('User updated:', user_data);
          resolve(user_data);
        })
        .catch((err: string) => {
          this._logger.error(err);
          reject(err);
        })
    })
  }

  public removeUser(username: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this._data.remove(username)
        .then((success: boolean) => {
          if (!success) {
            this._logger.error("Unknown error");
            reject("Unknown error");
          }

          resolve(`User ${username} removed with success`);
        })
        .catch((err: string) => {
          this._logger.error(err);
          reject(err);
        })
    })
  }
}