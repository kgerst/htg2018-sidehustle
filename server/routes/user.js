var express = require('express');
var router = express.Router();
var pg = require('pg');

var config = {
  database: 'htg_hustle',
  host: 'localhost',
  port: 5432,
  max: 12
};

var pool = new pg.Pool( config );

router.get('/', function(req, res) {
  console.log('In the users route', req.body);
  let users = [];
  pool.connect(function(error, connection, done) {
    if (error) {
      console.log('adminRouteError', error);
      res.sendStatus(400);
    } //end if
    else {
      console.log('adminDB connection ready');
      let resultSet = connection.query('SELECT * FROM users');
      resultSet.on('row', function(row) {
        users.push(row);
      }); //row end
      resultSet.on('end', function() {

        done();
        console.log(users);
        res.send(users);
      }); // resultSet end
    } //end else
  }); //pool.connect end
}); //router.GET end



module.exports = router;
