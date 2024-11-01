const User = require("../models/User");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const { userCacheKeys } = require("../utils/cacheKeys");
const {
  setCache,
  getCache,
  deleteCache,
  clearUserCache,
} = require("../cache/userCache");
const jwt = require("jsonwebtoken");

const userService = {
  register: async ({ username, email, password }) => {
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) throw new Error("User already exists");

    deleteCache(userCacheKeys.allUsers);

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    user.save();
    const isAuthUser = {
      id: user._id,
      email: user.email,
      username: user.username,
      password: user.password,
      token: generateToken(user._id),
    };

    return isAuthUser;
  },
  login: async (username, password) => {
    const user = await User.findOne({ username });
    if (!user) throw new Error("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid password");

    const isAuthUser = {
      id: user._id,
      email: user.email,
      username: user.username,
      password: user.password,
      token: generateToken(user._id),
    };

    return isAuthUser;
  },
  updateUser: async (id, usuario) => {
    const user = await User.findByIdAndUpdate(id, usuario, { new: true });

    if (user) {
      clearUserCache(id);
      deleteCache(userCacheKeys.allUsers);
    }

    return user;
  },
  getUser: async (id) => {
    const cacheKey = userCacheKeys.userById(id);
    let user = getCache(cacheKey);

    if (!user) {
      user = await User.findById(id);
      if (user) setCache(cacheKey, user);
    }

    return user;
  },
  getUsers: async ({ isn_usuario }) => {
    const cacheKey = userCacheKeys.allUsers;
    let users = getCache(cacheKey);

    if (!users) {
      users = await User.find({ _id: { $ne: isn_usuario } });
      setCache(cacheKey, users);
    }

    return users;
  },
  getAppInit: async ({ token }) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) throw new Error("User not found");

    const isAuthUser = {
      id: user._id,
      email: user.email,
      username: user.username,
      password: user.password,
      token: generateToken(user._id),
    };

    return isAuthUser;
  },
};

module.exports = userService;
