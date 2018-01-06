var express = require('express');
var path = require('path');
var app = express();
var pg = require('pg');


app.use(express.static('server/public'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/views/index.html'));
});

// server port set and listen
var serverPort = process.env.PORT || 3007;
app.set('port', serverPort);

var server = app.listen(serverPort, function() {
  console.log('up and listening on', server.address().port);
});

var config = {
  database: 'htg_hustle',
  host: 'localhost',
  port: 5432,
  max: 12
};

var pool = new pg.Pool( config );


app.get ('/getTasks', function(req, res){
  console.log('get Tasks route hit' );

  var allTasks = [];

    pool.connect(function( err, connection, done){
      if ( err ){
        console.log("we're in the error state");
        res.send("something weird is happening here.");

      } else {
        console.log('connected to db');
        var resultSet = connection.query("SELECT * from test");

        resultSet.on( 'row', function ( row ){
          allTasks.push ( row );
          });

        resultSet.on('end', function(){
          done();
        res.send(allTasks);
      });

      }
        });
});//end app.get

app.post ('/create', function(req, res){

    console.log("task recieved from client: ", req.body.info);

    pool.connect(function(err, connection, done){
      if (err) {
        // res.send("Error in /createTask route");
        res.send(400);
      }
      else {
        console.log("success! We reached the database. ");
        //TODO need to set up the database so we can pass info to it!
        completeStatus = 'N';
        connection.query("INSERT into tasks(info, complete) values ($1, $2)", [req.body.info, completeStatus]);

        done();
        res.send(200);
    }

});

});//end app.post
