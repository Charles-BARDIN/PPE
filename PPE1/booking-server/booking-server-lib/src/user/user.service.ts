import { User, ILogger } from 'm2l-core';

import { IUserDataAccess } from './iuser-data-access.interface';

export class UserService {
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
      this._data.checkIfUserExists(user_input.mail)
        .then((res) => {
          if (res) {
            this._logger.log(`Mail ${user_input.mail} already taken`);
            reject(`ERR_REGISTER_MAIL_TAKEN`);
            return;
          }

          return this._data.add(user_input);
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

  public login(credentials: { mail: string, password: string }): Promise<User> {
    return new Promise((resolve, reject) => {
      this._data.getUserByCredentials(credentials)
        .then(user => {
          if (user) {
            resolve(user);
          } else {
            reject('INVALID_CREDENTIALS');
          }
        })
        .catch(errors => {
          reject()
        });
    });
  }

  public updateUser(user_input: {
    id: number,
    firstname?: string,
    lastname?: string,
    mail: string,
    phone?: string,
    address?: string,
    zip?: string,
    town?: string,
    country?: string,
    password?: string,
    oldPassword?: string
  }): Promise<User> {
    return new Promise((resolve, reject) => {
      this._data.checkIfUserExists(user_input.mail, user_input.id)
        .then(res => {
          if(res) {
            reject('ERR_MODIFYUSER_MAIL_TAKEN');
            return;
          }

          return this._data.update(user_input);
        })
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
}
