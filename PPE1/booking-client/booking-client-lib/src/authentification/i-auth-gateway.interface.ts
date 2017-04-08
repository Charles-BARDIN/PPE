import { User } from 'm2l-core';

export interface IAuthGateway {
  login(credentials: { mail: string, password: string }): Promise<User>;
  logout(userID: number): Promise<boolean>;
  registerUser(user: {
    lastname: string,
    firstname: string,
    address: string,
    town: string,
    zip: string,
    country: string,
    mail: string,
    password: string,
    phone?: string
  }): Promise<User>;
  modifyUser(user: {
    id: number,
    address?: string,
    town?: string,
    zip?: string,
    country?: string,
    mail?: string,
    password?: string,
    confirm?: string,
    phone?: string
  }): Promise<User>;
}