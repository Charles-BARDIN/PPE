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
      this._logger.debug('UserService.addUser: called with parameter', user_input);
      this._data.checkIfUserExists(user_input.mail)
        .then((res) => {
          if (res) {
            this._logger.info('UserService.addUser: ERR_REGISTER_MAIL_TAKEN', user_input.mail);
            reject(`ERR_REGISTER_MAIL_TAKEN`);
            return;
          }

          this._logger.debug(`UserService.addUser: mail ${user_input.mail} not taken`);
          return this._data.add(user_input);
        })
        .then((user_data: User) => {
          if (!user_data) {
            this._logger.error('UserService.addUser: user added to database but not given in promise response');
            reject('ERR_UNKNOWN');
            return;
          }

          resolve(user_data);
        })
        .catch((err: string) => {
          this._logger.error('UserService.addUser:', err);
          reject('ERR_UNKNOWN');
        })
    });
  }

  public login(credentials: { mail: string, password: string }): Promise<User> {
    this._logger.debug('UserService.login: called with parameter', credentials);
    return new Promise((resolve, reject) => {
      this._data.getUserByCredentials(credentials)
        .then(user => {
          if (user) {
            this._logger.debug('UserService.login: login success', user);
            resolve(user);
          } else {
            this._logger.info('UserService.login: INVALID_CREDENTIALS', credentials);
            reject('INVALID_CREDENTIALS');
          }
        })
        .catch(err => {
          this._logger.error('UserService.addUser:', err);
          reject('ERR_UNKNOWN')
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
    this._logger.debug('UserService.updateUser: called with parameter', user_input);
    return new Promise((resolve, reject) => {
      this._data.checkIfUserExists(user_input.mail, user_input.id)
        .then(res => {
          if (res) {
            this._logger.info('UserService.updateUser: ERR_MODIFYUSER_MAIL_TAKEN', user_input.mail);
            reject(`ERR_MODIFYUSER_MAIL_TAKEN`);
            return;
          }

          this._logger.debug(`UserService.updateUser: mail ${user_input.mail} not taken`);
          if (user_input.password) {
            if (!user_input.oldPassword) {
              this._logger.info('UserService.updateUser: ERR_PASSWORD_REQUIRED', user_input.id);
              reject('ERR_PASSWORD_REQUIRED');
              return;
            }

            this._data.getUserByCredentials({ mail: user_input.mail, password: user_input.oldPassword })
              .then(user => {
                if (!user) {
                  this._logger.info('UserService.updateUser: INVALID_CREDENTIALS', { mail: user_input.mail, password: user_input.oldPassword });
                  reject('INVALID_CREDENTIALS');
                  return;
                }

                return this._data.update(user_input);
              })
          }
          else {
            return this._data.update(user_input);
          }
        })
        .then(resolve)
        .catch((err: string) => {
          this._logger.error('UserService.updateUser:', err);
          reject('ERR_UNKNOWN');
        })
    })
  }
}
