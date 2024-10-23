const taskEvents = require("./taskEvents");

const socketEvents = (io) => {
  taskEvents(io);
};

module.exports = socketEvents;
