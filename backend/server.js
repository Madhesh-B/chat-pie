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

chatNamespace.on('connection', (socket) => {
  console.log('User connected');
  socket.emit('chat', chats);

  socket.on('sendmsg', (updatedChat) => {
    const newMessages = Array.isArray(updatedChat.messages)
      ? updatedChat.messages
      : [updatedChat.messages];

    chats = chats.map((chat) => {
      if (chat.id === updatedChat.id) {
        return {
          ...chat,
          messages: [...chat.messages, ...newMessages.slice(chat.messages.length)],
        };
      }
      return chat;
    });

    chatNamespace.emit('updateChat', chats);
    console.log('Updated chat messages:', chats[0].messages);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
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
