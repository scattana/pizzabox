var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var port = 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(socket){
  socket.emit('hello', {port: port});
  
  // new user connects: emit message to all clients
  socket.on('new player', function(player){
    io.emit('chat message', player.name + ' has joined!');
  });

  // user disconnects: emit message to all clients
  socket.on('disconnect', function(player){
    io.emit('chat message', player.name + ' has left');
  });

  // new chat message: emit message to all clients
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});

