import { User } from 'm2l-core';

export interface IProfileAuthAccess {
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
  getUser(): User;
}