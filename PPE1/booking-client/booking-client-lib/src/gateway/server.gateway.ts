import { User } from 'm2l-core';

import { IAuthGateway } from '../session';

export class ServerGateway implements IAuthGateway {
  constructor() {

  }

  public login(credentials: { mail: string, password: string }): Promise<User> {
    return new Promise((resolve, reject) => {

    });
  }

  public logout(): Promise<boolean> {
    return new Promise((resolve, reject) => {

    });
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

    });
  }
}