const { gql } = require("apollo-server-express");

const userSchema = gql`
  type User {
    id: ID!
    token: String
    username: String!
    email: String!
  }

  extend type Query {
    getUsers(isn_usuario: ID!): [User]
    getUser(id: ID!): User
  }

  extend type Mutation {
    register(username: String!, email: String!, password: String!): User
    login(email: String!, password: String!): User
    getAppInit(token: String!): User
  }
`;

module.exports = userSchema;
