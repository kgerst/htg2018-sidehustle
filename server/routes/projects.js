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
  pool.connect(function(error, connection, done) {
    if (error) {
      res.sendStatus(400);
    }
    else {
      var query = "SELECT\n" +
        "p.*,\n" +
        "(SELECT descript FROM levels l WHERE l.level = p.projecttime) AS time,\n" +
        "array_agg((SELECT skill FROM skills s WHERE s.id = ps.skill_id)) AS skills,\n" +
        "array_agg(ps.proficiency) AS skill_proficiencies\n" +
        "FROM projects p\n" +
        "JOIN projects_levels pl ON p.id = pl.project_id\n" +
        "JOIN project_skills ps ON p.id = ps.project_id\n" +
        "JOIN user_skills us ON ps.skill_id = us.skill_id\n" +
        "WHERE us.user_id = 1\n" +
        "AND us.proficiency >= ps.proficiency\n" +
        "GROUP BY p.id";

      connection.query(query, function(err, result) {
        if (err) {
          res.status(500).send(err);
          process.exit(1);
        } else {
          var projects = result.rows;
          
          projects.forEach(function(project) {
            var skills = [];
            if (project.skills && project.skills.length) {

              project.skills.forEach(function(skill, idx) {
                skills.push({
                  skill : skill,
                  proficiency : project.skill_proficiencies[idx]
                });
              });
              project.skills = skills;
            }
          });

          res.send(result.rows);
          done();
        }
      });

    }
  });
});


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


module.exports = router;
