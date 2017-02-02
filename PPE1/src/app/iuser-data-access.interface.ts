import { UserModel } from 'm2l-core';

interface IUserDataAccess {
  checkIfUserExists(user: UserModel): Promise<{ mail_taken: boolean, username_taken: boolean }>;
  add(user: UserModel): Promise<UserModel>;
  get(user: { username?: string, mail?: string}): Promise<UserModel>;
  update(user: UserModel): Promise<UserModel>;
  remove(user: UserModel): Promise<boolean>;
}

export { IUserDataAccess };