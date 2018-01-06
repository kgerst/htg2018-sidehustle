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

router.get('/getallprojects', function(req, res) {
  console.log('In the projects route', req.body);
  let projects = [];
  pool.connect(function(error, connection, done) {
    if (error) {
      console.log('getallProjectsError', error);
      res.sendStatus(400);
    } //end if
    else {
      console.log('projectsDB connection ready');
      let resultSet = connection.query('SELECT * FROM projects');
      resultSet.on('row', function(row) {
        projects.push(row);
      }); //row end
      resultSet.on('end', function() {

        done();
        console.log(projects);
        res.send(projects);
      }); // resultSet end
    } //end else
  }); //pool.connect end
}); //router.GET end



module.exports = router;
