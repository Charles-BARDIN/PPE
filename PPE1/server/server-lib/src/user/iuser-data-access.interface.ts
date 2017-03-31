import { User } from 'm2l-core';

export interface IUserDataAccess {
  checkIfUserExists(mail: string): Promise<boolean>;

  add(user: {
    firstname: string,
    lastname: string,
    mail: string,
    phone: string,
    address: string,
    zip: string,
    town: string,
    country: string
  }): Promise<User>;

  get(id: number): Promise<User>;

  update(user: {
    id: number,
    firstname?: string,
    lastname?: string,
    mail?: string,
    phone?: string,
    address?: string,
    zip?: string,
    town?: string,
    country?: string
  }): Promise<User>;
}