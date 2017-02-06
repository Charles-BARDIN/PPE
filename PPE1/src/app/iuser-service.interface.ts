import { User } from 'm2l-core';

export interface IUserService {
  addUser(user_input: {
    username: string,
    firstname: string,
    lastname: string,
    mail: string,
    phone: string,
    address: string,
    zip: string,
    town: string,
    country: string
  }): Promise<User>;

  getUser(user: { username?: string, mail?: string }): Promise<User>;

  updateUser(user_input: {
    username: string,
    firstname?: string,
    lastname?: string,
    mail?: string,
    phone?: string,
    address?: string,
    zip?: string,
    town?: string,
    country?: string
  }): Promise<User>;

  removeUser(username: string): Promise<boolean>;
}