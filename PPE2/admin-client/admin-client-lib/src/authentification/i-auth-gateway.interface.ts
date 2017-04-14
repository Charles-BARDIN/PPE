import { Admin } from 'm2l-core';

export interface IAuthGateway {
  login(credentials: { mail: string, password: string }): Promise<Admin>;
  logout(userID: number): Promise<boolean>;
}
