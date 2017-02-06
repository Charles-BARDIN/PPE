import { User } from "m2l-core";

import { IUserDataAccess } from '../app';

export class UserDatabaseAdapter implements IUserDataAccess {
  constructor() { }

  public checkIfUserExists(user: {
    username: string,
    mail: string
  }): Promise<{ mail_taken: boolean, username_taken: boolean }> {
    return new Promise((resolve, reject) => {

    });
  }

  public add(user: User): Promise<User> {
    return new Promise((resolve, reject) => {

    });
  }

  public get(user: { username?: string, mail?: string }): Promise<User> {
    return new Promise((resolve, reject) => {

    });
  }

  public update(user: {
    username: string,
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

  public remove(username: string): Promise<boolean> {
    return new Promise((resolve, reject) => {

    });
  }
}