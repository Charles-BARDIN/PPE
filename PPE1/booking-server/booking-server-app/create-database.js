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
  if(err) {
    console.error(err);
    return;
  }

  connection.query(`CREATE DATABASE IF NOT EXISTS ${config.database};`, (err, res) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(`Database ${config.database} created with success`);
    process.exit(0);
  });
});


