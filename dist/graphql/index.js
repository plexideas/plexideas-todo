"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tools_1 = require("graphql-tools");
const lodash_1 = require("lodash");
const resolvers_js_1 = __importDefault(require("./user/resolvers.js"));
const resolvers_js_2 = __importDefault(require("./task/resolvers.js"));
const typedefs_js_1 = require("./user/typedefs.js");
const typedefs_js_2 = require("./task/typedefs.js");
const Query = `
  type Query {
    _empty: String
  }
`;
const Mutation = `
  type Mutation {
    _empty: String
  }
`;
const Subscription = `
  type Subscription {
    _empty: String
  }
`;
exports.resolvers = lodash_1.merge({}, resolvers_js_1.default, resolvers_js_2.default);
exports.schema = graphql_tools_1.makeExecutableSchema({
    typeDefs: [Query, Mutation, Subscription, typedefs_js_1.typeDef, typedefs_js_2.typeDef],
    resolvers: lodash_1.merge(exports.resolvers, resolvers_js_1.default, resolvers_js_2.default),
});
