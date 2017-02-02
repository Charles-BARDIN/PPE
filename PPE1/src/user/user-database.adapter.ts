import { UserModel } from 'm2l-core';

import { IUserDataAccess } from '../app';

class UserDatabaseAdapter implements IUserDataAccess {
  constructor() { }

  checkIfUserExists(user: UserModel): Promise<{ mail_taken: boolean, username_taken: boolean }> {
    return new Promise((resolve, reject) => {

    });
  }

  add(user: UserModel): Promise<UserModel> {
    return new Promise((resolve, reject) => {

    });
  }

  get(user: { username?: string, mail?: string }): Promise<UserModel> {
    return new Promise((resolve, reject) => {

    });
  }

  update(user: UserModel): Promise<UserModel> {
    return new Promise((resolve, reject) => {

    });
  }

  remove(user: UserModel): Promise<boolean> {
    return new Promise((resolve, reject) => {

    });
  }

}

export { UserDatabaseAdapter };