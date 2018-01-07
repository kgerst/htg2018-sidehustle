
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

// router.get('/getallprojects', function(req, res) {
//   console.log('In the projects route', req.body);
//   let projects = [];
//   pool.connect(function(error, connection, done) {
    // if (error) {
    //   console.log('getallProjectsError', error);
    //   res.sendStatus(400);
    // } //end if
    // else {
    //   console.log('projectsDB connection ready');
    //   let resultSet = connection.query('SELECT * FROM projects', function(err, rows, fields) {
//         // console.log(rows);
//         // console.log(fields);
//
//         for (var row in rows) {
//           console.log("this is a row:");
//           console.log(row);
//           console.log(row['name']);
//           console.log(row.rowAsArray());
//         }
//         // rows.forEach(function(row){projects.push(row.name);});
//         // console.log(projects);
//       });
//       // resultSet.on('row', function(row) {
//       //   projects.push(row);
//       // }); //row end
//       // resultSet.on('end', function() {
//       //
//       //   done();
//       //   console.log(projects);
//       //   res.send(projects);
//       // }); // resultSet end
//     } //end else
//   }); //pool.connect end
// }); //router.GET end

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

router.post('/addproject', function(req, res){
  console.log('made to add projects route', req.body);
  pool.connect(function(err, connection, done){
    if (err) {
      console.log(err);
      res.send(400);
    } else {
      console.log('connected to database');
      connection.query('INSERT INTO projects (name, description) VALUES ($1, $2)', [req.body.p_name, req.body.p_descript]);
        done();
        res.sendStatus(200);
    } // end else
  }); // end pool connect
});// end rounter.post





module.exports = router;
