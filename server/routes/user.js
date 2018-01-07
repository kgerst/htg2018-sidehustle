var express = require('express');
var router = express.Router();
var pg = require('pg');
var random = require('../../modules/alphaNumericRandomizer');

var config = {
  database: 'htg_hustle',
  host: 'localhost',
  port: 5432,
  max: 12
};

var pool = new pg.Pool( config );

router.get('/', function(req, res) {
  console.log('In the users route', req.body);
  var users = [];
  pool.connect(function(error, connection, done) {
    if (error) {
      console.log('adminRouteError', error);
      res.sendStatus(400);
    } //end if
    else {
      var query = "SELECT * " +
      "FROM users";

      connection.query(query, function(err, result) {
        if (err) {
          console.log(err);
          res.status(500).send(err);
          process.exit(1);
        } else {
          res.send(result.rows);
          done();
        }
      });

    } //end else
  }); //pool.connect end
}); //router.GET end


router.get('/profile/:id', function(req, res) {
  var id = req.params.id;

  pool.connect(function(err, connection, done) {
    if (err) {
      res.sendStatus(400);
    }
    else {
      var query = "SELECT concat(u.name, ' ', u.last_name) AS name, u.email, u.bio, u.compensation,\n" +
        " array_agg((SELECT skill FROM skills s WHERE s.id = us.skill_id)) AS skills,\n" +
        " array_agg((SELECT distinct descript from levels l where l.level = ul.level_id)) as level\n" +
        " FROM users AS u\n" +
        " join user_skills us on u.id = us.user_id \n" +
        " join users_levels ul on u.id = ul.user_id\n" +
        " where u.id = $1\n" +
        " group by u.name, u.last_name, u.bio, u.compensation, u.email";

      connection.query(query, [id], function(err, result) {
        if (err) {
          console.log(err);
          res.status(500).send(err);
          process.exit(1);
        } else {
          var profiles = result.rows;
          profiles.forEach(function(profile) {
            if (profile.level && profile.level.length) profile.level = profile.level[0];
          });
          res.send(profiles[0]);
          done();
        }
      });
    }
  });
});


router.get('/skills', function(req, res) {

  pool.connect(function(err, connection, done) {
    if (err) {
      res.sendStatus(500);
    }
    else {
      var query = "select * from skills";

      connection.query(query, [id], function(err, result) {
        if (err) {
          console.log(err);
          res.status(500).send(err);
          process.exit(1);
        } else {
          var skills = result.rows;
          res.send(skills);
          done();
        }
      });
    }
  });
});



module.exports = router;
