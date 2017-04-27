import * as mySql from 'mysql';

export class Database {
  private _connection: mySql.IConnection;
  private _config: { host: string, user: string, password: string, database: string };

  constructor(config: {
    host: string,
    user: string,
    password: string,
    database: string
  }) {
    this._config = config;

    this._connection = mySql.createConnection({
      host: config.host,
      user: config.user,
      password: config.password,
      database: config.database
    });
  }

  set database(database: string) {
    this._config.database = database;
  }

  public query(sql: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._connection.query(sql, (err, res) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(res);
      });
    })
  }
}