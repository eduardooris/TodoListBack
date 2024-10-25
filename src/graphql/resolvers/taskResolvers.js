const taskService = require("../../services/taskService");
const { emitEvent } = require("../../sockets/socketEvents/eventEmitter");

const taskResolvers = {
  Query: {
    getTasks: async (_, { isn_usuario }, { token }) => {
      if (!token) {
        throw new Error("Not authenticated");
      }
      return await taskService.getTasks(isn_usuario);
    },
    getAllTasks: async (_, {}, { token }) => {
      if (!token) {
        throw new Error("Not authenticated");
      }
      return await taskService.getAllTasks();
    },
    getTask: async (_, { id }, { token }) => {
      if (!token) {
        throw new Error("Not authenticated");
      }
      return await taskService.getTask(id);
    },
  },
  Mutation: {
    addTask: async (_, { title, isn_usuario }, { token }) => {
      if (!token) {
        throw new Error("Not authenticated");
      }

      const task = await taskService.addTask(title, isn_usuario);

      const taskAdded = {
        title: task.title,
        completed: task.completed,
        id: task.id,
      };

      emitEvent("taskAdded", taskAdded, task.token);

      return task;
    },
    updateTask: async (_, { id, completed }, { token }) => {
      if (!token) {
        throw new Error("Not authenticated");
      }
      const task = await taskService.updateTask(id, completed);

      const taskUpdated = {
        title: task.title,
        completed: task.completed,
        id: task.id,
      };

      emitEvent("taskUpdated", taskUpdated, task.isn_usuario);
      return task;
    },
    deleteTask: async (_, { id }, { token }) => {
      if (!token) {
        throw new Error("Not authenticated");
      }
      const task = await taskService.deleteTask(id);

      const taskDeleted = {
        id: id,
      };

      emitEvent("taskDeleted", taskDeleted, token);

      return task;
    },
    addComment: async (_, { id, isn_usuario, comment }, { token }) => {
      if (!token) {
        throw new Error("Not authenticated");
      }
      return await taskService.addComment(id, isn_usuario, comment);
    },
    deleteComment: async (_, { id, commentId }, { token }) => {
      if (!token) {
        throw new Error("Not authenticated");
      }
      return await taskService.deleteComment(id, commentId);
    },
  },
};

module.exports = taskResolvers;
