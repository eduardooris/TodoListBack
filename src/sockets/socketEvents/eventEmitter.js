let io;

const setIoInstance = (instance) => {
  io = instance;
};

const emitEvent = (event, data, userId) => {
  if (!io) {
    throw new Error("Socket.IO not initialized");
  }
  const roomId = `tasks_${userId}`;
  io.to(roomId).emit(event, data);
};

module.exports = {
  setIoInstance,
  emitEvent,
};
