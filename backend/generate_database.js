const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('backend/database.sqlite');


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
});