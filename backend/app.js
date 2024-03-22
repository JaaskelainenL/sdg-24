const cors = require('cors');
const express = require('express');
const app = express();
const port = 3001;
const sqlite3 = require('sqlite3');



// Init database
const db = new sqlite3.Database('backend/database.sqlite', (err) => {
  if (err) {
      console.error('Error connecting to the database:', err.message);
  } else {
      console.log('Connected to the database');
  }
});



// Routing
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  return res.status(200).json({message:"helloo frontend"});
});











// Fetch n most refent reports
app.get('/reports', (req, res) => {


  var limit = 10;
  var offset = 0;


  if (req.query.limit !== undefined && !isNaN(req.query.limit)) {
      limit = req.query.limit;

      if(limit > 100)
        limit = 100;


  }

  if (req.query.offset !== undefined && !isNaN(req.query.offset)) {
    offset = req.query.offset;
  }



  db.all("SELECT rowid as id,* FROM reports ORDER BY id DESC LIMIT ? OFFSET ?", [limit, offset], (error, rows) => {

    if(error)
      return res.status(500);

    var data = [];

    rows.forEach((row) => {
      data.push(row)
    });

    return res.status(200).json({reports:data});
  });


  return res.status(500);


});




app.post('/create/', (req, res) => {


  if (req.body.msg === undefined || req.body.msg.length == 0) {
    return res.status(400);
  }

  if (req.body.gps_lat === undefined || isNaN(parseFloat(req.body.gps_lat))) {
    return res.status(400);
  }

  if (req.body.gps_lng === undefined || isNaN(parseFloat(req.body.gps_lng))) {
    return res.status(400);
  }

  let msg = req.body.msg;
  if(msg.length > 2000){
    msg = msg.substring(0, 2000);
  }

  let lat = parseFloat(req.body.gps_lat);

  let lng = parseFloat(req.body.gps_lng);


  db.run(`INSERT INTO reports (msg, gps_lat, gps_lng) VALUES (?, ?, ?)`, [msg, lat, lng], function(err) {
    if (err) {
        return res.status(500);
    }

    return res.status(200).json({insertID:this.lastID});
  });


  return res.status(500);

});


app.post('/fix/', (req, res) => {

  console.log(req.body);

  if (req.body.id === undefined || isNaN(req.body.id)) {
    return res.status(400);
  }

  let id = req.body.id;

  db.run(`UPDATE reports SET fixed=CURRENT_TIMESTAMP WHERE rowid=?;`, [id], function(err) {
    if (err) {
        return res.status(500);
    }


    return res.status(200).json({"fixed":true});
  });


  return res.status(500);

});








app.listen(port, () => {
  console.log(`Backend listening on port ${port}`)
})
