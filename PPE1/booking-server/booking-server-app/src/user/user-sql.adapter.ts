import { User, ILogger } from "m2l-core";

import { IUserDataAccess } from 'booking-server-lib';

import { Database } from '../common';

import * as mysql from 'mysql';

const escape = mysql.escape;

export class UserSQLAdapter implements IUserDataAccess {
  private _db: Database;
  private _logger: ILogger;

  constructor(config: { database: Database, logger: ILogger }) {
    this._db = config.database;
    this._logger = config.logger;
  }

  public checkIfUserExists(mail: string, id?: number): Promise<boolean> {
    this._logger.debug(`UserSQLAdapter.checkIfUserExists: called with parameter mail: ${mail}, id: ${id}`);
    return new Promise((resolve, reject) => {
      let query = `SELECT user_mail, user_id
                  FROM user
                  WHERE user_mail = ${escape(this._escapeHtml(mail))}`;

      if (id) {
        this._logger.debug(`UserSQLAdapter.checkIfUserExists: id filter is set to ${id}`);
        query += ` AND user_id <> ${escape(this._escapeHtml(id.toString()))};`
      } else {
        this._logger.debug(`UserSQLAdapter.checkIfUserExists: id filter is not set`);
        query += ';';
      }

      this._logger.debug('UserSQLAdapter.checkIfUserExists: query:', query);
      this._db.query(query)
        .then(users => {
          this._logger.debug(`UserSQLAdapter.checkIfUserExists: data:`, users);
          const userIsPresent = users.length !== 0;
          if (userIsPresent) {
            this._logger.info(`UserSQLAdapter.checkIfUserExists: user ${users[0].id} is found`);
            resolve(true);
            return;
          }

          this._logger.info(`UserSQLAdapter.checkIfUserExists: user with ${mail} mail is not found`)
          resolve(false);
        })
        .catch(reject);
    });
  };

  public add(user: {
    firstname: string,
    lastname: string,
    mail: string,
    password: string,
    phone?: string,
    address: string,
    zip: string,
    town: string,
    country: string
  }): Promise<User> {
    this._logger.debug(`UserSQLAdapter.add: called with parameter`, user);
    return new Promise((resolve, reject) => {
      let query = `INSERT INTO user(user_firstname, user_name, user_mail, user_password, user_phone, user_adresse, user_zip, user_city, user_country)
                  VALUES (${escape(this._escapeHtml(user.firstname))}, ${escape(this._escapeHtml(user.lastname))}, ${escape(this._escapeHtml(user.mail))}, ${escape(this._escapeHtml(user.password))}, ${user.phone ? escape(this._escapeHtml(user.phone)) : 'NULL'}, ${escape(this._escapeHtml(user.address))}, ${escape(this._escapeHtml(user.zip))}, ${escape(this._escapeHtml(user.town))}, ${escape(this._escapeHtml(user.country))});`

      this._logger.debug('UserSQLAdapter.add: query to add the user:', query);

      this._db.query(query)
        .then(() => {
          query = `SELECT * 
                  FROM user 
                  WHERE user_mail = ${escape(this._escapeHtml(user.mail))};`

          this._logger.debug('UserSQLAdapter.add: query to retrieve the user:', query);
          return this._db.query(query);
        })
        .then(users => {
          this._logger.debug(`UserSQLAdapter.add: data:`, users);

          if (!(users.length && users[0])) {
            this._logger.error(`UserSQLAdapter.add: user added is not found`);
            reject('ERR_ADDED_USER_NOT_FOUND');
            return;
          }

          const user = this._createUserEntity(users[0]);
          this._logger.info(`UserSQLAdapter.add: created user entity`, user);
          resolve(user);
        })
        .catch(reject);
    });
  };

  public getUserByCredentials(credentials: {
    mail: string,
    password: string
  }): Promise<User> {
    this._logger.debug(`UserSQLAdapter.getUserByCredentials: called with parameter`, credentials);
    return new Promise((resolve, reject) => {
      const query = `SELECT * 
                      FROM user
                      WHERE user_mail = ${escape(this._escapeHtml(credentials.mail))}
                      AND user_password = ${escape(this._escapeHtml(credentials.password))};`;

      this._logger.debug('UserSQLAdapter.getUserByCredentials: query:', query);
      this._db.query(query)
        .then(users => {
          this._logger.debug(`UserSQLAdapter.getUserByCredentials: data:`, users);

          if (!(users.length && users[0])) {
            this._logger.info(`UserSQLAdapter.getUserByCredentials: user with credentials`, credentials, 'is not found');
            resolve(undefined);
            return;
          }

          const user = this._createUserEntity(users[0]);
          this._logger.info(`UserSQLAdapter.getUserByCredentials: user found, created user entity`, user);
          resolve(user);
        })
        .catch(reject);
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
    this._logger.debug(`UserSQLAdapter.update: called with parameter`, user);
    return new Promise((resolve, reject) => {
      let query = this._getUpdateUserQuery(user);
      this._logger.debug('UserSQLAdapter.update: query:', query);
      this._db.query(query)
        .then(() => {
          query = `SELECT * 
                  FROM user 
                  WHERE user_id = ${escape(this._escapeHtml(user.id.toString()))};`;

          this._logger.debug('UserSQLAdapter.update: query:', query);

          return this._db.query(query);
        })
        .then(users => {
          this._logger.debug(`UserSQLAdapter.update: data:`, users);

          if (!(users.length && users[0])) {
            this._logger.error(`UserSQLAdapter.update: user modified is not found`);
            reject('ERR_MODIFIED_USER_NOT_FOUND');
            return;
          }

          const user = this._createUserEntity(users[0]);
          this._logger.info(`UserSQLAdapter.update: modified user entity`, user);
          resolve(user);
        })
        .catch(reject);
    });
  };

  private _getUpdateUserQuery(user: {
    id: number,
    firstname?: string,
    lastname?: string,
    mail?: string,
    phone?: string,
    address?: string,
    zip?: string,
    town?: string,
    country?: string
  }) {
    let query = [
      `UPDATE user`,
      `SET`
    ];

    [
      'mail',
      'phone',
      'address',
      'zip',
      'town',
      'country',
      'password',
    ].forEach(property => {
      if (user[property]) {
        if (property === 'address') {
          query.push(`user_adresse = ${escape(this._escapeHtml(user[property]))}`, `,`);
          return;
        }
        if (property === 'town') {
          query.push(`user_city = ${escape(this._escapeHtml(user[property]))}`, `,`);
          return;
        }
        query.push(`user_${property} = ${escape(this._escapeHtml(user[property]))}`, `,`);
      }
    });
    query.pop();

    query.push(`WHERE user_id = ${escape(this._escapeHtml(user.id.toString()))};`);
    return query.join(' ');
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

  private _createUserEntity(dbUser: {
    user_id: number,
    user_password: string,
    user_name: string,
    user_firstname: string,
    user_mail: string,
    user_phone?: string,
    user_adresse: string,
    user_city: string,
    user_zip: string,
    user_country: string
  }): User {
    return new User({
      id: Number(this._unescapeHtml(dbUser.user_id.toString())),
      lastname: this._unescapeHtml(dbUser.user_name),
      firstname: this._unescapeHtml(dbUser.user_firstname),
      mail: this._unescapeHtml(dbUser.user_mail),
      phone: dbUser.user_phone ? this._unescapeHtml(dbUser.user_phone) : undefined,
      address: this._unescapeHtml(dbUser.user_adresse),
      town: this._unescapeHtml(dbUser.user_city),
      zip: this._unescapeHtml(dbUser.user_zip),
      country: this._unescapeHtml(dbUser.user_country)
    });
  }
}