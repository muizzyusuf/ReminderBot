const mysql = require("mysql");
var express = require('express');
var router = express.Router();


const bodyparser = require("body-parser");


const mysqlConnection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "reminderdb",
  multipleStatements: true
});

mysqlConnection.connect(err => {
  if (!err) console.log("database has connected");
  else console.log("there is an error");
});

router.get("/data", (req, res) => {
  mysqlConnection.query("Select * from reminder", (err, rows, fields) => {
    if (!err) {
      console.log(rows);
      res.send(rows);
    } else console.log(err);
  });
});

// router.get("/data/:name", (req, res) => {
//   mysqlConnection.query(
//     "Select * from reminder where name= ?",
//     [req.params.name],
//     (err, rows, fields) => {
//       if (!err) {
//         //console.log(rows);
//         res.send(rows);
//       } else console.log(err);
//     }
//   );
// });

router.get("/data/:id", (req, res) => {
  mysqlConnection.query(
    "Select * from reminder where id= ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) {
        //console.log(rows);
        res.send(rows);
      } else console.log(err);
    }
  );
});

router.delete("/data/:id", (req, res, next) => {
  mysqlConnection.query(
    "DELETE FROM reminder where id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) {
        //console.log(rows);
        res.send("deleted successfully");
      } else console.log(err);
    }
  );
});

router.post("/data", (req, res) => {
  let dtab = req.body;
  var sql =
    "SET @Time1 = ?; SET @Date1 = ?; SET @Event1 =?; SET @Venue = ?; SET @ReminderCode = ?; SET @id = ?; CALL EmployeeAddOrEdit(@Time1,@Date1,@Event1,@Venue,@ReminderCode,@id);";
  mysqlConnection.query(
    sql,
    [dtab.Time1, dtab.Date1, dtab.Event1, dtab.Venue, dtab.ReminderCode, dtab.id,],
    (err, rows, fields) => {
      if (!err) {
        rows.forEach(element => {
          if (element.constructor == Array )
          res.send("Inserted reminder id : "+element[0].id);
        });
        //console.log(rows);
   
      } else {
        console.log(err);
        res.send(rows);
      }
    }
  );
});
module.exports = router;