const { gql } = require('apollo-server-express');

const taskSchema = gql`
    type Task {
        id: ID!
        userId: ID!
        title: String!
        completed: Boolean!
    }

    extend type Query {
        getTasks: [Task]
        getTask(id: ID!): Task
    }

    extend type Mutation {
        addTask(id: ID!, title: String!): Task
        updateTask(id: ID!, completed: Boolean!): Task
        deleteTask(id: ID!): Boolean
    }
`;

module.exports = taskSchema;
