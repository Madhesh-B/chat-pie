const express = require('express');
const { Server } = require('socket.io');
const cors = require('cors');
const http = require('http');

const app = express();
const server = http.createServer(app);

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

const chatNamespace = io.of('chat');

let chats = [
  {
    id: 1,
    person: "Demo",
    messages: {
      id: 1,
      chat: [
        {
          id: 1,
          sendBy: "System",
          message:
            "This is the demo chat for you",
        },
      ],
    },
  },
];;

let users = {};

chatNamespace.on('connection', (socket) => {
  console.log('User connected');

  users[socket.id] = { id: socket.id, name: "Anonymous" };
  socket.emit('update_user_count', Object.keys(users).length);

  socket.emit('chat', chats);

  socket.on('message_send', (updatedChat) => {
    socket.broadcast.emit('recieve_message', updatedChat)
    chats[0].messages.chat.push(updatedChat);
    console.log(updatedChat.messages.chat);
  });

  socket.on('disconnect', () => {
    delete users[socket.id];
    console.log('User disconnected' , Object.keys(users).length);
    io.emit("user_count", Object.keys(users).length);
  });
});

app.get('/users', (req, res) => {
  res.json(chats);
  console.log('Data sent!');
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
