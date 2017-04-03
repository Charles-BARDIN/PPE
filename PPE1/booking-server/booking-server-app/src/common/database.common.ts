import * as mySql from 'mysql';

export class Database {
  private _connection: mySql.IConnection;
  private _config: { host: string, user: string, password: string, database?: string };

  constructor(config: {
    host: string,
    user: string,
    password: string,
    database?: string
  }) {
    this._config = config;

    this._connection = mySql.createConnection({
      host: config.host,
      user: config.user,
      password: config.password,
      database: config.database
    });

    this._connection.connect(err => {
      if (err) throw new Error(err.stack);
      this._init();
    });
  }

  set database(database: string) {
    this._config.database = database;
  }

  private _init() {
    this.query(`CREATE DATABASE IF NOT EXISTS ${this._config.database}`)
      .then(() => {
        
      })
      .catch(err => {
        throw new Error(err.stack);
      })
  }

  public query(sql: string) {
    return new Promise((resolve, reject) => {
      this._connection.query(sql, (err, res) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(res);
      })
    })
  }
}