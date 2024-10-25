const NodeCache = require("node-cache");
const taskCache = new NodeCache({ stdTTL: 600 });
const {taskCacheKeys} = require("../utils/cacheKeys");
const setCache = (key, value) => taskCache.set(key, value);
const getCache = (key) => taskCache.get(key);
const deleteCache = (key) => taskCache.del(key);
const clearUserTasksCache = (isn_usuario) =>
  taskCache.del(taskCacheKeys.userTasks(isn_usuario));

module.exports = {
  setCache,
  getCache,
  deleteCache,
  clearUserTasksCache,
};
