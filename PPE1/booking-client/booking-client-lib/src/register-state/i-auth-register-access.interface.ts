import { User } from 'm2l-core';

export interface IAuthRegisterAccess {
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
  }): Promise<User>
}