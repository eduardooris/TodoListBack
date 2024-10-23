const { gql } = require("apollo-server-express");

const userSchema = gql`
  type User {
    id: ID!
    username: String!
    email: String!
  }

  extend type Query {
    getUsers: [User]
    getUser(id: ID!): User
  }

  extend type Mutation {
    register(username: String!, email: String!, password: String!): User
    login(email: String!, password: String!): String
  }
`;

module.exports = userSchema;
