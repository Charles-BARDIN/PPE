import { User } from 'm2l-core';

import { INavigationAuthAccess } from '../navigation';
import { IIndexAuthAccess } from '../index-state';
import { IAuthRegisterAccess } from '../register-state';
import { IBookingAuthAccess } from '../booking-state';
import { ILoginAuthAccess } from '../login-state';
import { ILogoutAuthAccess } from '../logout-state';
import { IProfileAuthAccess } from '../profile-state';

import { IAuthGateway } from './i-auth-gateway.interface';

export class AuthService implements INavigationAuthAccess, IIndexAuthAccess, IAuthRegisterAccess, IBookingAuthAccess, ILoginAuthAccess, ILogoutAuthAccess, IProfileAuthAccess {
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
        reject('ERR_LOGIN_MAIL_REQUIRED');
        return;
      } else if (!credentials.password) {
        reject('ERR_LOGIN_PASSWORD_REQUIRED');
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

          resolve(user);
        })
        .catch(err => reject(err));
    });
  }

  public modifyUser(user: {
    id: number,
    address?: string,
    town?: string,
    zip?: string,
    country?: string,
    mail?: string,
    password?: string,
    confirm?: string,
    phone?: string
  }): Promise<User> {
    return new Promise((resolve, reject) => {
      user.password = this._hash(user.password);

      this._gateway.modifyUser(user)
        .then(user => {
          this._user = user;

          resolve(user);
        })
        .catch(err => reject(err));
    });
  }

  public userIsConnected(): boolean {
    return this._user != null;
  }

  public getUserID(): number {
    return this._user.id;
  }

  public getUser(): User {
    return this._user;
  }
}