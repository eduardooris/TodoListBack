require("dotenv").config();
const http = require("http");
const app = require("./app");
// const setupSocket = require('./config/socket');

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
// const io = setupSocket(server);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
