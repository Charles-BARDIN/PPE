const mySql = require('mysql');

const config = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'booking_app',
};

const connection = mySql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password
});

connection.connect(err => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  connection.query(
    `CREATE DATABASE IF NOT EXISTS ${config.database};`,
    err => {
      if (err) {
        console.error(err);
        process.exit(1);
      }

      connection.query(
        `USE ${config.database};`,
        err => {
          if (err) {
            console.error(err);
            process.exit(1);
          }

          connection.query(
            `CREATE TABLE IF NOT EXISTS user(
              user_id        int (11) Auto_increment  NOT NULL,
              user_password  Varchar (255) NOT NULL,
              user_name      Varchar (255) NOT NULL,
              user_firstname Varchar (255) NOT NULL,
              user_mail      Varchar (255) NOT NULL,
              user_phone          Varchar (20) ,
              user_adresse   Varchar (255) NOT NULL,
              user_city           Varchar (255) NOT NULL,
              user_zip            Varchar (25) NOT NULL,
              user_country        Varchar (225) NOT NULL,
              PRIMARY KEY (user_id),
              UNIQUE (user_mail)
            )ENGINE=InnoDB;`,
            err => {
              if (err) {
                console.error(err);
                process.exit(1);
              }

              connection.query(
                `CREATE TABLE IF NOT EXISTS room(
                  room_id          int (11) Auto_increment  NOT NULL,
                  room_label       Varchar(25) NOT NULL,
                  room_description Text NOT NULL,
                  room_image       Varchar (255),
                  PRIMARY KEY (room_id)
                )ENGINE=InnoDB;`,
                err => {
                  if (err) {
                    console.error(err);
                    process.exit(1);
                  }

                  connection.query(
                    `CREATE TABLE IF NOT EXISTS booking(
                      booking_date Date NOT NULL,
                      user_id int NOT NULL,
                      room_id int NOT NULL,
                      PRIMARY KEY (room_id, booking_date),
                      CONSTRAINT FK_booking_user_id FOREIGN KEY (user_id) REFERENCES user(user_id),
                      CONSTRAINT FK_booking_room_id FOREIGN KEY (room_id) REFERENCES room(room_id)
                    )ENGINE=InnoDB;`,
                    err => {
                      if (err) {
                        console.error(err);
                        process.exit(1);
                      }

                      connection.query(
                        `CREATE TABLE IF NOT EXISTS admin(
                          admin_id        int (11) Auto_increment  NOT NULL,
                          admin_password  Varchar (255) NOT NULL,
                          admin_mail      Varchar (255) NOT NULL,
                          PRIMARY KEY (admin_id),
                          UNIQUE (admin_mail)
                        )ENGINE=InnoDB;`,
                        err => {
                          if (err) {
                            console.error(err);
                            process.exit(1);
                          }

                          console.log(`Database ${config.database} created with success`);
                          process.exit(0);
                        });
                    }
                  );
                }
              );
            }
          );
        }
      );
    }
  );
});
