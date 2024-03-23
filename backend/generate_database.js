const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('backend/database.sqlite');
const bcrypt = require('bcrypt');


db.serialize(() => {
    db.run("DROP TABLE IF EXISTS reports");
    db.run(`    
    CREATE TABLE reports (
        msg TEXT NOT NULL,
        created DATETIME DEFAULT CURRENT_TIMESTAMP,
        fixed DATETIME,
        gps_lat FLOAT NOT NULL,
        gps_lng FLOAT NOT NULL
    ); `);

    // DUMMY DATA
    for(i = 0; i<100; i++){
        const query = `INSERT INTO reports (msg, gps_lat, gps_lng) VALUES (?, ?, ?)`;
        db.run(query, [`msg nro ${i}`, 0.0, 0.0], function(err) {
            if (err) {
                return console.error(err.message);
            }
            console.log(`A row has been inserted with rowid ${this.lastID}`);
        });
    }

    bcrypt.hash("admin", 10, (err, hash) => {
        if (err) {
          console.error('Error while hashing password:', err);
          return;
        }
      
        db.run("DROP TABLE IF EXISTS users;");
        db.run(`    
        CREATE TABLE users (
            name varchar(255) UNIQUE NOT NULL,
            hash varchar(255) NOT NULL,
            role varchar(255) DEFAULT "ADMIN"
        ); `);

        const query = `INSERT INTO users (name,hash) VALUES (?, ?)`;
        db.run(query, ["admin",hash], function(err) {
            if (err) {
                return console.error(err.message);
            }
        });


      });



});