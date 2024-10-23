const taskService = require("../../services/taskService");
const { emitEvent } = require("../../sockets/socketEvents/eventEmitter");

const taskResolvers = {
  Query: {
    getTasks: async (_, {}, { userId }) => {
      if (!userId) {
        throw new Error("Not authenticated");
      }
      return await taskService.getTasks();
    },
    getTask: async (_, { id }, { userId }) => {
      if (!userId) {
        throw new Error("Not authenticated");
      }
      return await taskService.getTask(id);
    },
  },
  Mutation: {
    addTask: async (_, { title, isn_usuario }, { userId }) => {
      if (!userId) {
        throw new Error("Not authenticated");
      }

      const task = await taskService.addTask(title, isn_usuario);

      const taskAdded = {
        title: task.title,
        completed: task.completed,
        id: task.id,
      };

      emitEvent("taskAdded", taskAdded, task.userId);

      return task;
    },
    updateTask: async (_, { id, completed }, { userId }) => {
      if (!userId) {
        throw new Error("Not authenticated");
      }
      const task = await taskService.updateTask(id, completed);

      const taskUpdated = {
        title: task.title,
        completed: task.completed,
        id: task.id,
      };

      emitEvent("taskUpdated", taskUpdated, task.userId);
      return task;
    },
    deleteTask: async (_, { id }, { userId }) => {
      if (!userId) {
        throw new Error("Not authenticated");
      }
      const task = await taskService.deleteTask(id);

      const taskDeleted = {
        id: id,
      };

      emitEvent("taskDeleted", taskDeleted, userId);

      return task;
    },
    addComment: async (_, { id, isn_usuario, comment }, { userId }) => {
      if (!userId) {
        throw new Error("Not authenticated");
      }
      return await taskService.addComment(id, isn_usuario, comment);
    },
  },
};

module.exports = taskResolvers;
