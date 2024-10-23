const User = require("../models/User");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

const userService = {
  register: async (username, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    return await user.save();
  },
  login: async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid password");

    return generateToken(user._id);
  },
};

module.exports = userService;
