const taskService = require("../../services/taskService");

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
    addTask: async (_, { title, id }, { userId }) => {
      if (!userId) {
        throw new Error("Not authenticated");
      }
      return await taskService.addTask(title, id);
    },
    updateTask: async (_, { id, completed }) => {
      return await taskService.updateTask(id, completed);
    },
    deleteTask: async (_, { id }) => {
      return await taskService.deleteTask(id);
    },
  },
};

module.exports = taskResolvers;
