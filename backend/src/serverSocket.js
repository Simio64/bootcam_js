import { configDotenv } from 'dotenv'
import { Server } from 'socket.io'
import { app } from './server.js'
import http from 'http'

configDotenv()

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: ['http://127.0.0.1', 'http://localhost' ,'http://localhost:5173']
  }
});

let onlineUsers = [];

io.on('connection', socket => {
  socket.on('@client/new_user', data => {
    if (!onlineUsers.some(element => element.name == data.name)) {
      onlineUsers.push({ ...data, id_session: socket.id })
    }
    io.emit('@server/new_user', onlineUsers)
  })
  socket.on('disconnect', () => {
    const filtered = onlineUsers.filter(function (value, index, arr) {
      return value.id_session !== socket.id;
    });
    onlineUsers = filtered
    io.emit('@server/new_user', onlineUsers)
  })
  socket.on('@client/new_message', () => {
    setTimeout(() => {
      io.emit('@server/new_message', onlineUsers)
    }, 100);
  })
})

server.listen(process.env.PORT, () => {
  console.log(`Listen on port: ${process.env.PORT}`)
  console.log(`Environment: ${process.env.NODE_ENV}`)
  console.log(`Socket status: ${process.env.SOCKET}`)
})