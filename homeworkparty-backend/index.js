var express = require('express');

var cors = require('cors')

var app = require('express')();
app.use(cors())

var http = require('http').createServer(app);
var io = require('socket.io')(http);
app.use(express.json());      
app.use(express.urlencoded());

app.options('*', cors());
var rooms = ["UC Berkeley"]
app.get('/', function(req, res){
  res.send('<h1>Hello world</h1>');
});
app.get('/number-of-clients', function(req, res){
  res.send(NumClientsInRoom('/', req.query.room));
});
app.get('/rooms', function(req, res){
  res.send(rooms);
});
function NumClientsInRoom(namespace, room) {
  var clients = io.nsps[namespace].adapter.rooms[room];
  return Object.keys(clients).length;
}

io.on('connection', function(socket){
    console.log('User Connected');

    socket.on('disconnect', function(){
        console.log('User Disconnected');

    });
    socket.on('create-room', function(room){
      console.log(room)
      rooms.push(room)


    });
    socket.on('join-room', function(room){
      console.log("Someone just joined: " + room)
      socket.join(room);

    });
    socket.on('chat-message-offer', function(room, user, msg){
        console.log(user + ' says: "' + msg + '" in room: ' + room);
        io.to(room).emit('chat-message', user, msg)
        
    });
    
});


http.listen(3001, function(){
  console.log('listening on *:3001');
});