import { Admin, ILogger } from 'm2l-core';

import { IAdminDataAccess } from 'admin-server-lib';

import { Database } from '../common';

import * as mysql from 'mysql';

const escape = mysql.escape;

export class AdminSQLAdapter implements IAdminDataAccess {
  private _db: Database;
  private _logger: ILogger;

  constructor(config: { database: Database, logger: ILogger }) {
    this._db = config.database;
    this._logger = config.logger;
  }

  public getAdminByCredentials(credentials: { mail: string, password: string }): Promise<Admin> {
    return new Promise((resolve, reject) => {
      const query = `SELECT * 
                      FROM admin
                      WHERE admin_mail = ${escape(this._escapeHtml(credentials.mail))}
                      AND admin_password = ${escape(this._escapeHtml(credentials.password))};`;

      this._db.query(query)
        .then(admins => {

          if (!(admins.length && admins[0])) {
            resolve(undefined);
            return;
          }

          const admin = new Admin({
            id: Number(this._unescapeHtml(admins[0].admin_id)),
            mail: this._unescapeHtml(admins[0].admin_mail)
          });

          resolve(admin);
        })
        .catch(reject);
    });
  }

  private _escapeHtml(unsafe: string): string {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  private _unescapeHtml(safe: string): string {
    return safe
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'");
  }
}