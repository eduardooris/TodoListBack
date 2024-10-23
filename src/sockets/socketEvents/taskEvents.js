const taskEvents = (io) => {
  io.on("connection", (socket) => {
    console.log("Novo cliente conectado:", socket.id);

    socket.on("joinTaskRoom", (userId) => {
      const roomId = `tasks_${userId}`;
      socket.join(roomId);
      console.log(`Usuário ${userId} se juntou à sala: ${roomId}`);
    });
  });
};

module.exports = taskEvents;
