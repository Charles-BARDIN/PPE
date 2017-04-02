import { User } from 'm2l-core';

import { INavigationAuthAccess } from '../navigation';
import { IIndexAuthAccess } from '../index-state';
import { IAuthRegisterAccess } from '../register-state';

import { IAuthGateway } from './i-auth-gateway.interface';

export class AuthService implements INavigationAuthAccess, IIndexAuthAccess, IAuthRegisterAccess {
  private _gateway: IAuthGateway;
  private _user: User;
  private _hash: Function;

  constructor(config: {
    authGateway: IAuthGateway,
    hash: Function
  }) {
    this._gateway = config.authGateway;
    this._hash = config.hash;
  }

  public login(credentials: { mail: string, password: string }): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!credentials.mail) {
        reject('Please fill the "mail" field');
        return;
      } else if (!credentials.password) {
        reject('Please fill the "password" field');
        return;
      }

      credentials.password = this._hash(credentials);

      this._gateway.login(credentials)
        .then(user => {
          this._user = user;
          resolve(true);
        })
        .catch(err => {
          reject(err);
        });
    })
  }

  public logout(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this._gateway.logout(this._user.id)
        .then(res => {
          this._user = undefined;
          resolve(true);
        })
        .catch(err => reject(err));
    })
  }

  public registerUser(user: {
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
      user.password = this._hash(user.password);

      this._gateway.registerUser(user)
        .then(user => {
          this._user = user;

          resolve(User);
        })
        .catch(err => reject(err));
    });
  }

  public userIsConnected(): boolean {
    return this._user != null;
  }
}