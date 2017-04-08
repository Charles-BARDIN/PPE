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
  password: config.password,
  database: config.database
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
        `INSERT INTO room(room_label, room_description, room_image)
        VALUES('Amphithéâtre', 'Amphithéâtre description', ''), ('Salle de réunion', 'Salle de réunion description', ''), ('Salle de convivialité', 'Salle de convivialité description', '');`,
        err => {
          if (err) {
            console.error(err);
            process.exit(1);
          } 
          
          console.log(`Database ${config.database} filled with success`);
          process.exit(0);

        }
      );
    }
  );
});
