function configSockets(io){
    io.on('connection', (socket) => {
        socket.on('newMessage', (message) => {
            socket.broadcast.emit('newMessage', message);
        })
    })
}

module.exports = configSockets;