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
      this._db.query(
        `SELECT user_mail
        FROM user
        WHERE user_mail = '${mail}'`
      )
        .then(user => {
          resolve(!!user);
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
    phone: string,
    address: string,
    zip: string,
    town: string,
    country: string
  }): Promise<User> {
    return new Promise((resolve, reject) => {
      this._db.query(
        `INSERT INTO user(user_firstname, user_lastname, user_mail, user_password, user_phone, user_adresse, user_zip, user_town, user_country)
        VALUES ('${user.firstname}', '${user.lastname}', '${user.mail}', '${user.password}', '${user.phone}', '${user.address}', '${user.zip}', '${user.town}', '${user.country}');`
      )
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
        WHERE user_mail = '${credentials.mail}'
        AND user_password = '${credentials.password}';`
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
          return this._db.query(`SELECT * FROM user WHERE user_id = '${user.id}';`)
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
          query.push(`user_adresse = '${user[property]}'`, `,`);
          return;
        }
        if (property === 'town') {
          query.push(`user_city = '${user[property]}'`, `,`);
          return;
        }
        query.push(`user_${property} = '${user[property]}'`, `,`);
      }
    });
    query.pop();

    query.push(`WHERE user_id = '${user.id}';`);
    return query.join(' ');
  }

  private _createUserEntity(dbUser: {
    user_id: number,
    user_password: string,
    user_name: string,
    user_firstname: string,
    user_mail: string,
    user_phone: string,
    user_adresse: string,
    user_city: string,
    user_zip: string,
    user_country: string
  }): User {
    return new User({
      id: dbUser.user_id,
      lastname: dbUser.user_name,
      firstname: dbUser.user_firstname,
      mail: dbUser.user_mail,
      phone: dbUser.user_phone,
      address: dbUser.user_adresse,
      town: dbUser.user_city,
      zip: dbUser.user_zip,
      country: dbUser.user_country
    });
  }
}