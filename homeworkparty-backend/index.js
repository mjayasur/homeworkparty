var app = require('express')();
var http = require('https').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.send('<h1>Hello world</h1>');
});

let rooms = {"UC Berkeley" : {onlineUsers : []}, "UCLA" : {onlineUsers : []}}

io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('disconnect', function(){
        console.log('user disconnected');
      });
    socket.on('send-message', function(msg, user){
        console.log('message received: ' + msg, user);
        io.emit('send-back', msg, user)
    });
    socket.on('log-on', function(packet) {
      let userName = packet.userName
      let userObj = {userName : socket} 
      rooms[packet.room].onlineUsers.push( );
      console.log(rooms);
    })
});


http.listen(3001, function(){
  console.log('listening on *:3001');
});