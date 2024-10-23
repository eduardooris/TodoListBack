const Task = require("../models/Task");

const taskService = {
  getTasks: async () => {
    return await Task.find();
  },
  getTask: async (id) => {
    return await Task.findById(id);
  },
  addTask: async (title, id) => {
    const task = new Task({ title, isn_usuario: id });
    return await task.save();
  },
  updateTask: async (id, completed) => {
    return await Task.findByIdAndUpdate(id, { completed }, { new: true });
  },
  deleteTask: async (id) => {
    await Task.findByIdAndDelete(id);
    return true;
  },
  addComment: async (taskId, isn_usuario, comment) => {
    const task = await Task.findById(taskId);
    task.comments.push({ isn_usuario, comment });
    return await task.save();
  },
};

module.exports = taskService;
