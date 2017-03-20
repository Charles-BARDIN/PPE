import { User } from 'm2l-core';

export interface IUserAccess {
  add(user: {
    username: string,
    firstname: string,
    lastname: string,
    mail: string,
    phone: string,
    address: string,
    zip: string,
    town: string,
    country: string
  }): Promise<{ user: User, faults: string[] }>;

  remove(username: string): Promise<{ user: User, faults: string[] }>;

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
  }): Promise<{ user: User, faults: string[] }>;

  login(credentials: { username: string, password: string }): Promise<{ success: boolean, faults: string[] }>;
}