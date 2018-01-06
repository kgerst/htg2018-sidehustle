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
