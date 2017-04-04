import { User } from 'm2l-core';

export interface IUserDataAccess {
  checkIfUserExists(mail: string): Promise<boolean>;

  add(user: {
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

  getUserByCredentials(credentials: {
    mail: string,
    password: string
  }): Promise<User>;

  update(user: {
    id: number,
    firstname?: string,
    lastname?: string,
    mail?: string,
    phone?: string,
    address?: string,
    password?: string,
    oldPassword?: string,
    zip?: string,
    town?: string,
    country?: string
  }): Promise<User>;
}