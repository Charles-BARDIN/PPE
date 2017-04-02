import { IAuthGateway } from './i-auth-gateway.interface';

export class AuthService {
  private _gateway: IAuthGateway;

  constructor(config: {
    authGateway: IAuthGateway
  }) {
    this._gateway = config.authGateway;
  }
}