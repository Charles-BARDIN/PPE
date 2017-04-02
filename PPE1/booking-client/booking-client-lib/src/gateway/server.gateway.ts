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
}