//@ts-check

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const message = require('./controllers/message');


app.use(express.static('./client'));


app.use(express.json());



io.on('connection', async (socket) => {
  socket.on('status', async (msg) => {
    message.getMessages(io, msg);
  });

  socket.on('chat message', async (msg) => {
message.postMessage(io, msg)
  });
});






server.listen(process.env.PORT || 4000, () => {
  console.log('listening on *:4000');
});

module.exports = {
  io
};
