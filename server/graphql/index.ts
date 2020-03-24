import { makeExecutableSchema } from 'graphql-tools';
import { merge } from 'lodash';

import userResolvers from './user/resolvers.js';
import taskResolvers from './task/resolvers.js';
import { typeDef as User } from './user/typedefs.js';
import { typeDef as Task } from './task/typedefs.js';

const Query = `
  type Query {
    _empty: String
  }
`;

const Mutation = `
  type Mutation {
    _empty: String
  }
`
const Subscription = `
  type Subscription {
    _empty: String
  }
`

export const resolvers = merge({}, userResolvers, taskResolvers);

export const schema = makeExecutableSchema({
  typeDefs: [ Query, Mutation, Subscription, User, Task ],
  resolvers: merge(resolvers, userResolvers, taskResolvers),
});
