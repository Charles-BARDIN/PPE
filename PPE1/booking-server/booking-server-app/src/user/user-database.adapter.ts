import { User } from "m2l-core";

import { IUserDataAccess } from 'booking-server-lib';

import { Database } from '../common';

export class UserDatabaseAdapter implements IUserDataAccess {
  private _db: Database;

  constructor(config: { database: Database }) {
    this._db = config.database;
  }

  public checkIfUserExists(mail: string): Promise<boolean> {
    return new Promise((resolve, reject) => {

    });
  };

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
  };

  public getUserByCredentials(credentials: {
    mail: string,
    password: string
  }): Promise<User> {
    return new Promise((resolve, reject) => {

    });
  };

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
  };
}