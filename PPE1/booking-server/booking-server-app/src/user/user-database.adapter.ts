import { User } from "m2l-core";

import { IUserDataAccess } from 'server-lib';

export class UserDatabaseAdapter implements IUserDataAccess {
  constructor() { }

  public checkIfUserExists(mail: string): Promise<boolean> {
    return new Promise((resolve, reject) => {

    });
  }

  public add(user: {
    firstname: string,
    lastname: string,
    mail: string,
    phone: string,
    address: string,
    zip: string,
    town: string,
    country: string
  }): Promise<User> {
    return new Promise((resolve, reject) => {

    });
  }

  public get(id: number): Promise<User> {
    return new Promise((resolve, reject) => {

    });
  }

  public update(user: {
    id: number,
    firstname?: string,
    lastname?: string,
    mail?: string,
    phone?: string,
    address?: string,
    zip?: string,
    town?: string,
    country?: string
  }): Promise<User> {
    return new Promise((resolve, reject) => {

    });
  }
}