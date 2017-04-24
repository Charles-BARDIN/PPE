import { Admin } from 'm2l-core';

export interface IAdminDataAccess {
  getAdminByCredentials(credentials: { mail: string, password: string }): Promise<Admin>
}