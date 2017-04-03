import { User } from 'm2l-core';

import { INavigationAuthAccess } from '../navigation';
import { IIndexAuthAccess } from '../index-state';
import { IRegisterAuthAccess } from '../register-state';
import { IBookingAuthAccess } from '../booking-state';
import { ILoginAuthAccess } from '../login-state';
import { ILogoutAuthAccess } from '../logout-state';
import { IProfilAuthAccess } from '../profil-state';

import { IAuthGateway } from '.';

export class AuthService implements INavigationAuthAccess, IIndexAuthAccess, IRegisterAuthAccess, IBookingAuthAccess, ILoginAuthAccess, ILogoutAuthAccess, IProfilAuthAccess {
  private _gateway: IAuthGateway;
  private _user: User;
  private _hash: Function;

  constructor(config: {
    gateway: IAuthGateway,
    hash: Function
  }) {
    this._gateway = config.gateway;
    this._hash = config.hash;
  }

  public login(credentials: { mail: string, password: string }): Promise<boolean> {
    return new Promise((resolve, reject) => {credentials.password = this._hash(credentials);
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
    oldPassword?: string,
    phone?: string
  }): Promise<User> {
    return new Promise((resolve, reject) => {
      user.password = this._hash(user.password);
      user.oldPassword = this._hash(user.oldPassword);

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