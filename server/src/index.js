import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { sequelize } from './db.js';
import Message from './model/Message.js';

(async () => {
  await sequelize.sync({ force: true });
})();

const app = express();
app.use(cors());

app.get('/messages', async (req, res) => {
  const messages = await Message.findAll();
  res.status(200).json(messages);
});

const server = createServer(app);

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

  socket.on('message', async (data) => {
    await Message.create({
      content: data,
    });
    io.emit('message');
  });
});

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});
