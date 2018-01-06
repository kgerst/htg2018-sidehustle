var express = require('express');
var path = require('path');
var app = express();
var router = express.Router();
var pg = require('pg');

var users = require('./routes/user');
var projects = require('./routes/projects');

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/views/index.html'));
});

app.use('/users', users);
// app.use('/projects', projects);
// app.use('/', routes);
// app.use(app.router);
// routes.initialize(app);


// server port set and listen
var serverPort = process.env.PORT || 3007;
app.set('port', serverPort);

var server = app.listen(serverPort, function() {
  console.log('up and listening on', server.address().port);
});

module.exports = router;
