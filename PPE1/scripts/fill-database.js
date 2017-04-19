const mySql = require('mysql');
const escape = mySql.escape;

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

      const amphiDescr = escape(`D'une capacité de 100 personnes, nos amphithéatre vous permettront de réserver une grande salle pour vos employés.`);
      const reunionDescr = escape(`D'une capacité de 20 personnes, nos salles de réunions vous permettront d'organiser vos activités`);
      const convivDescr = escape(`Les salles de convialité vous permettront de déjeuner dans les locaux de la Maison des Ligues ainsi que de vous reposer.`);
      
      connection.query(
        `INSERT INTO room(room_label, room_description, room_image)
        VALUES('Amphithéâtre', ${amphiDescr}, 'amphitheatre.jpg'), ('Salle de réunion', ${reunionDescr}, 'salle_reunion.jpg'), ('Salle de convivialité', ${convivDescr}, 'salle_convivial.jpg');`,
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
