import { User } from 'm2l-core';

export interface IUserDataAccess {
  checkIfUserExists(user: { mail: string, username: string }): Promise<{ mail_taken: boolean, username_taken: boolean }>;

  add(user: User): Promise<User>;

  get(user: { username?: string, mail?: string }): Promise<User>;

  update(user: {
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

  remove(username: string): Promise<boolean>;
}