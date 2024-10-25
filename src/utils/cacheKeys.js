const taskCacheKeys = {
    allTasks: 'tasks:all',
    userTasks: (isn_usuario) => `tasks:user:${isn_usuario}`,
    taskById: (id) => `tasks:id:${id}`,
  };

  const userCacheKeys = {
    allUsers: 'users:all',
    userById: (id) => `users:id:${id}`,
  };
  
  module.exports = { taskCacheKeys, userCacheKeys };
  