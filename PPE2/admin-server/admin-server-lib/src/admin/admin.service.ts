import { Admin } from 'm2l-core';

export class AdminService {
  constructor() {

  }

  public login(credentials: { mail: string, password: string }): Promise<boolean> {
    return new Promise((resolve, reject) => {

    });
  }

  public logout(): Promise<boolean> {
    return Promise.resolve(true);
  }
}