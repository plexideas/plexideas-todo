export const typeDef = `
  type Task {
    _id: String
    text: String,
    owner: String,
    status: String,
    created: String,
    updated: String,
    isDone: Boolean
  }
  extend type Query {
    task(_id: String!): Task
    tasks(owner: String): [Task!]!
  }
  extend type Mutation {
    createTask(text: String, owner: String!): Task
    editTask(_id: String!, text: String): Task
    changeTaskStatus(_id: String!, status: String): Task
    makeTaskDone(_id: String!): Task
    deleteTask(_id: String!): String
  }

  extend type Subscription {
    taskCreated: Task
    taskDeleted: String
    taskEdited: Task
  }
`
