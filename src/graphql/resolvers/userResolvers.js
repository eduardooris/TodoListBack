const User = require("../../models/User");
const userService = require("../../services/userService");

const userResolvers = {
  Query: {
    getUsers: async (_, { id }, { userId }) => {
      if (!userId) {
        throw new Error("Not authenticated");
      }
      return await User.find();
    },
    getUser: async (_, { id }) => {
      return await User.findById(id);
    },
  },
  Mutation: {
    register: async (_, { username, email, password }) => {
      return await userService.register(username, email, password);
    },
    login: async (_, { email, password }) => {
      return await userService.login(email, password);
    },
  },
};

module.exports = userResolvers;