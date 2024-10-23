const jwt = require("jsonwebtoken");

const authMiddleware = async ({ req }) => {
  const token = req.headers["authorization"];
  let userId = null;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      userId = decoded.id;
    } catch (err) {
      console.error("Invalid token:", err);
    }
  }

  return { userId };
};
module.exports = authMiddleware;
