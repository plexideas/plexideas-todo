"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskTypeDefs = `
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
    changeTaskStatus(_id: String!, status: String): Task
    makeTaskDone(_id: String!): Task
    deleteTask(_id: String!): Task
  }
`;
