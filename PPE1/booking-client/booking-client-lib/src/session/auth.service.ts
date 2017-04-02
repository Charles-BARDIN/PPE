import { User } from 'm2l-core';

import { IAuthGateway } from './i-auth-gateway.interface';

export class AuthService {
  private _gateway: IAuthGateway;
  private _user: User;

  constructor(config: {
    authGateway: IAuthGateway
  }) {
    this._gateway = config.authGateway;
  }

  userIsConnected(): boolean {
    return this._user != null;
  }
}