const Task = require("../models/Task");

const taskService = {
  getTasks: async () => {
    return await Task.find();
  },
  getTask: async (id) => {
    return await Task.findById(id);
  },
  addTask: async (title, id) => {
    const task = new Task({ title, userId: id });
    return await task.save();
  },
  updateTask: async (id, completed) => {
    return await Task.findByIdAndUpdate(id, { completed }, { new: true });
  },
  deleteTask: async (id) => {
    await Task.findByIdAndDelete(id);
    return true;
  },
};

module.exports = taskService;
