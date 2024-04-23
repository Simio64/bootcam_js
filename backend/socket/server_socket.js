require('dotenv').config()

const http = require('http')
const { Server } = require('socket.io')
const { app } = require('../src/server')

const url_dir = 'https://sleepy-caverns-95273.herokuapp.com'

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: ["http://127.0.0.1", url_dir]
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
    console.log(`Enviroment: ${process.env.NODE_ENV}`)
    console.log(`Socket status: ${process.env.SOCKET}`)
})