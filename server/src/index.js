import cookie from 'cookie';
import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { sequelize } from './db.js';
import Message from './model/Message.js';
import Session from './model/Session.js';
import User from './model/User.js';

(async () => {
  User.belongsTo(Session);
  Session.belongsTo(User);
  User.hasMany(Message);
  Message.belongsTo(User);
  await sequelize.sync();
})();

const app = express();
app.use(cors());

app.get('/messages', async (req, res) => {
  const messages = await Message.findAll({
    attributes: { exclude: ['userId', 'updatedAt'] },
    include: [{ model: User, attributes: ['name'] }],
  });
  res.status(200).json(messages);
});

const server = createServer(app);

const port = process.env.PORT || 3001;

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
});

io.on('connection', async (socket) => {
  console.log('a user connected');

  const cookies = cookie.parse(socket.request.headers.cookie || '');
  const sessionToken = cookies['next-auth.session-token'] || '';

  const session = await Session.findOne({ where: { sessionToken } });
  const userId = session?.userId;

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('message', async (data) => {
    await Message.create({
      content: data,
      userId: userId,
    });
    io.emit('message');
  });
});

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});
