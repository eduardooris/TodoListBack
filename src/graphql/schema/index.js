const { gql } = require('apollo-server-express');
const userSchema = require('./userSchema');
const taskSchema = require('./taskSchema');

const baseSchema = gql`
  type Query {
    _empty: String
  }
  
  type Mutation {
    _empty: String
  }
`;

const typeDefs = [
  baseSchema,
  userSchema,
  taskSchema,
];

module.exports = typeDefs;
