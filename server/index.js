const cuid = require('cuid');
const express = require('express');
const app = express();
const http = require('http');

const server = http.createServer(app);
const { Server } = require('socket.io');

const port = process.env.PORT || 3001;

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('message', (data) => {
    const message = {
      id: cuid(),
      content: data,
      createdAt: Date.now(),
    };
    console.log(message);
    io.emit('message', message);
  });
});

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});
