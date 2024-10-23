const { gql } = require("apollo-server-express");

const taskSchema = gql`
  type Task {
    id: ID!
    isn_usuario: ID!
    title: String!
    completed: Boolean!
    comments: [Comment]
  }

  type Comment {
    id: ID!
    isn_usuario: ID!
    comment: String!
    dsc_annex: String
    date: String!
  }

  extend type Query {
    getTasks: [Task]
    getTask(id: ID!): Task
  }

  extend type Mutation {
    addTask(isn_usuario: ID!, title: String!): Task
    updateTask(id: ID!, completed: Boolean!): Task
    deleteTask(id: ID!): Boolean
    addComment(id: ID!, isn_usuario: ID!, comment: String!): Task
  }
`;

module.exports = taskSchema;
