const User = require("../../models/User");
const userService = require("../../services/userService");

const userResolvers = {
  Query: {
    getUsers: async (_, { isn_usuario }, { token }) => {
      if (!token) {
        throw new Error("Not authenticated");
      }

      console.log("isn_usuario", isn_usuario);
      return userService.getUsers({ isn_usuario });
    },
    getUser: async (_, { id }, { token }) => {
      if (!token) {
        throw new Error("Not authenticated");
      }
      return userService.getUser(id);
    },
  },
  Mutation: {
    register: async (_, { username, email, password }) => {
      return userService.register({ username, email, password });
    },
    login: async (_, { email, password }) => {
      return userService.login(email, password);
    },
    getAppInit: async (_, { token }) => {
      return userService.getAppInit({token});
    }
  },
};

module.exports = userResolvers;
