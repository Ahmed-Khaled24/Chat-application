function configSockets(io){
    io.on('connection', (socket) => {
        socket.on('newMessage', (messageId) => {
            io.emit('newMessage', messageId);
        })
    })
}

module.exports = configSockets;