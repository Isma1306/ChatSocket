//@ts-check

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);


app.use(express.static('./client'));


app.use(express.json());

io.on('connection', (socket) => {

  socket.on('status', (msg) => {
    io.emit('status', msg);
  });
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

});




server.listen(process.env.PORT || 3000, () => {
  console.log('listening on *:3000');
});