/** @format */

var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var robot = require('robotjs');

app.use('/', express.static(__dirname));

// app.get('/', function(req, res) {
//   res.sendFile(__dirname + '/index.html');
// });

io.on('connection', function(socket) {
  console.log('a user connected');

  socket.on('touchstart', key => {
    console.log('touchstart', key);
    robot.keyToggle(key, 'down');
  });
  socket.on('touchend', key => {
    console.log('touchend', key);
    robot.keyToggle(key, 'up');
  });
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});
