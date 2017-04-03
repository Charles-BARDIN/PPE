import { User } from 'm2l-core';

export interface IProfilAuthAccess {
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
  user: User;
}