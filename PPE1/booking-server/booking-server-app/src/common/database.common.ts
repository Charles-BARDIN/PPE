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

    this._init();
  }

  set database(database: string) {
    this._config.database = database;
  }

  private _init() {
    this.query(
      `CREATE TABLE IF NOT EXISTS user(
        user_id        int (11) Auto_increment  NOT NULL ,
        user_password  Varchar (255) NOT NULL ,
        user_name      Varchar (255) NOT NULL ,
        user_firstname Varchar (255) NOT NULL ,
        user_mail      Varchar (255) NOT NULL ,
        user_phone          Varchar (20)  ,
        user_adresse   Varchar (255) NOT NULL ,
        user_city           Varchar (255) NOT NULL ,
        user_zip            Varchar (25) NOT NULL ,
        user_country        Varchar (225) NOT NULL ,
        PRIMARY KEY (user_id),
        UNIQUE (user_mail)
      )ENGINE=InnoDB;`
    )
      .then(() => {
        return this.query(
          `CREATE TABLE IF NOT EXISTS room(
            room_id          int (11) Auto_increment  NOT NULL ,
            room_label       Varchar(25) NOT NULL ,
            room_description Text NOT NULL ,
            room_image       Varchar (25) ,
            PRIMARY KEY (room_id)
          )ENGINE=InnoDB;`
        );
      })
      .then(() => {
        this.query(
          `CREATE TABLE IF NOT EXISTS booking(
            booking_date Date NOT NULL ,
            user_id int NOT NULL,
            room_id int NOT NULL,
            PRIMARY KEY (room_id, booking_date),
            CONSTRAINT FK_booking_user_id FOREIGN KEY (user_id) REFERENCES user(user_id),
            CONSTRAINT FK_booking_room_id FOREIGN KEY (room_id) REFERENCES room(room_id)
          )ENGINE=InnoDB;`
        );
      })
      .catch(err => {
        throw new Error(err.stack);
      })
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