const NodeCache = require("node-cache");
const userCache = new NodeCache({ stdTTL: 600 });
const { userCacheKeys } = require("../utils/cacheKeys");
const setCache = (key, value) => userCache.set(key, value);
const getCache = (key) => userCache.get(key);
const deleteCache = (key) => userCache.del(key);
const clearUserCache = (isn_usuario) =>
  userCache.del(userCacheKeys.userById(isn_usuario));

module.exports = {
  setCache,
  getCache,
  deleteCache,
  clearUserCache,
};
