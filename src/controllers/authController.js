const userService = require("../services/userService");

const authController = {
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const user = await userService.register(username, email, password);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const token = await userService.login(email, password);
      res.status(200).json({ token });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  },
};

module.exports = authController;
