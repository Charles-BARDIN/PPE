import { UserModel } from 'm2l-core';

interface IUserService {
  addUser(user_input: UserModel): Promise<UserModel>;
  getUser(user: { username?: string, mail?: string }): Promise<UserModel>;
  updateUser(user_input: UserModel): Promise<UserModel>;
  removeUser(user_input: UserModel): Promise<boolean>;
}

export { IUserService };