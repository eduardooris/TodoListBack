const Task = require("../models/Task");
const {
  setCache,
  getCache,
  deleteCache,
  clearUserTasksCache,
} = require("../cache/taskCache");
const { taskCacheKeys } = require("../utils/cacheKeys");
const { formatDate, generateDate } = require("../utils/formatDate");

const taskService = {
  getAllTasks: async () => {
    return Task.find();
  },

  getTasks: async (isn_usuario) => {
    const cacheKey = taskCacheKeys.userTasks(isn_usuario);
    let tasks = getCache(cacheKey);

    if (!tasks) {
      tasks = await Task.find({ isn_usuario });
      setCache(cacheKey, tasks);
    }

    return tasks;
  },

  getTask: async (id) => {
    const cacheKey = taskCacheKeys.taskById(id);
    let task = getCache(cacheKey);

    if (!task) {
      task = await Task.findById(id);
      if (task) setCache(cacheKey, task);
    }

    return task;
  },

  addTask: async ({ title, description, isn_usuario, date }) => {
    const task = new Task({
      title,
      description,
      isn_usuario,
      date: formatDate(date),
      date_created: generateDate(),
    });
    await task.save();

    clearUserTasksCache(isn_usuario);
    deleteCache(taskCacheKeys.allTasks);
    return task;
  },

  updateTask: async ({ id, completed }) => {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { completed, date_updated: generateDate() },
      { new: true }
    );

    if (updatedTask) {
      setCache(taskCacheKeys.taskById(id), updatedTask);
      clearUserTasksCache(updatedTask.isn_usuario);
    }

    return updatedTask;
  },

  deleteTask: async (id) => {
    const task = await Task.findByIdAndDelete(id);
    if (task) {
      deleteCache(taskCacheKeys.taskById(id));
      clearUserTasksCache(task.isn_usuario);
    }
    return !!task;
  },

  addComment: async (taskId, isn_usuario, comment) => {
    const task = await Task.findById(taskId);
    if (!task) return null;

    task.comments.push({
      isn_usuario,
      comment,
      date_created: generateDate(),
    });

    await task.save();

    setCache(taskCacheKeys.taskById(taskId), task);
    return task;
  },

  deleteComment: async (taskId, commentId) => {
    const task = await Task.findById(taskId);
    if (!task) return null;

    task.comments = task.comments.filter((comment) => comment.id !== commentId);
    await task.save();
    setCache(taskCacheKeys.taskById(taskId), task);
    return task;
  },
};

module.exports = taskService;
