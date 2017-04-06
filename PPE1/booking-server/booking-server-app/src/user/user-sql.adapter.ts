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
    return new Promise((resolve, reject) => {
      this._db.query(
        `SELECT user_mail, user_id
        FROM user
        WHERE user_mail = ${escape(this._escapeHtml(mail))};`
      )
        .then(users => {
          const userIsPresent = users.length !== 0;
          const isUser = id ? Number(users[0].user_id) === Number(id) : false;
          resolve(userIsPresent && !isUser);
        })
        .catch(err => {
          reject(err);
        })
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
    return new Promise((resolve, reject) => {
      this._db.query(
        `INSERT INTO user(user_firstname, user_name, user_mail, user_password, user_phone, user_adresse, user_zip, user_city, user_country)
        VALUES (${escape(this._escapeHtml(user.firstname))}, ${escape(this._escapeHtml(user.lastname))}, ${escape(this._escapeHtml(user.mail))}, ${escape(this._escapeHtml(user.password))}, ${user.phone ? escape(this._escapeHtml(user.phone)) : 'NULL'}, ${escape(this._escapeHtml(user.address))}, ${escape(this._escapeHtml(user.zip))}, ${escape(this._escapeHtml(user.town))}, ${escape(this._escapeHtml(user.country))});`
      )
        .then(() => {
          return this._db.query(`SELECT * FROM user WHERE user_mail = ${escape(this._escapeHtml(user.mail))};`)
        })
        .then(users => {
          resolve(this._createUserEntity(users[0]));
        })
        .catch(err => {
          reject(err);
        })
    });
  };

  public getUserByCredentials(credentials: {
    mail: string,
    password: string
  }): Promise<User> {
    return new Promise((resolve, reject) => {
      this._db.query(
        `SELECT * 
        FROM user
        WHERE user_mail = ${escape(this._escapeHtml(credentials.mail))}
        AND user_password = ${escape(this._escapeHtml(credentials.password))};`
      )
        .then(users => {
          resolve(users.length ? this._createUserEntity(users[0]) : undefined);
        })
        .catch(err => {
          reject(err);
        })
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
      this._db.query(
        this._getUpdateUserQuery(user)
      )
        .then(() => {
          return this._db.query(`SELECT * FROM user WHERE user_id = ${escape(this._escapeHtml(user.id.toString()))};`)
        })
        .then(users => {
          resolve(this._createUserEntity(users[0]));
        })
        .catch(err => {
          reject(err);
        })
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