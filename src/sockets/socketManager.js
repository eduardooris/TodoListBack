// src/config/socketManager.js
const { Server } = require('socket.io');
const { setIoInstance } = require('./socketEvents/eventEmitter');
const socketEvents = require('./socketEvents');

let io;

const initSocket = (httpServer) => {
    io = new Server(httpServer, {
        cors: {
            origin: '*', // Ajuste conforme necessário
            methods: ['GET', 'POST'],
        },
    });

    setIoInstance(io); // Define a instância do Socket.IO
    socketEvents(io);
};

module.exports = { initSocket };
