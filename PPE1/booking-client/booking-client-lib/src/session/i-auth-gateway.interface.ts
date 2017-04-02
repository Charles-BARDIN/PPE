import { User } from 'm2l-core';

export interface IAuthGateway {
  login(credentials: { mail: string, password: string }): Promise<User>
  logout(userID: number): Promise<boolean>
}