const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const connectDB = require("./config/db");
const typeDefs = require("./graphql/schema/index");
const authMiddleware = require("./middlewares/authMiddleware");
const resolvers = require("./graphql/resolvers/index");
const errorHandler = require("./utils/errorHandler");
const cors = require("cors");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});



async function startServer() {
  await server.start();
  server.applyMiddleware({ app });
}
startServer();
app.use(errorHandler);

module.exports = app;
