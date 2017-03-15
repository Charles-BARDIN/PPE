import { User } from 'm2l-core';

export interface IUserService {
  addUser(user_input: {
    firstname: string,
    lastname: string,
    mail: string,
    phone: string,
    address: string,
    zip: string,
    town: string,
    country: string
  }): Promise<User>;

  getUser(id: number): Promise<User>;

  updateUser(user_input: {
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

  removeUser(id: number): Promise<boolean>;
}