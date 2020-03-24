"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tools_1 = require("graphql-tools");
const resolvers_1 = __importDefault(require("./resolvers"));
const typeDefs = `
  type Task {
    _id: String
    text: String,
    owner: String,
    status: String,
    created: String,
    updated: String,
    isDone: Boolean
  }
  type Query {
    task: Task
    tasks: [Task!]!
  }
  type Mutation {
    createTask(text: String, owner: String!): Task
    editTask(_id: String!, text: String): Task
    deleteTask(_id: String!): Task
  }
`;
exports.default = graphql_tools_1.makeExecutableSchema({ typeDefs, resolvers: resolvers_1.default });
