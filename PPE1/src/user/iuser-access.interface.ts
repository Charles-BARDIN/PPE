import { UserModel, User } from 'm2l-core';

interface IUserAccess {
  add(user: UserModel): Promise<{ user: User, faults: string[] }>;
  remove(user: UserModel): Promise<{ user: User, faults: string[] }>;
  update(user: UserModel): Promise<{ user: User, faults: string[] }>;
  login(credentials: { username: string, password: string }): { success: boolean, faults: string[] };
}

export { IUserAccess };