"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userTypeDefs = `
  type User {
    email: String,
    name: String,
    givenName: String,
    familynName: String,
    picture: String,
    token: String,
  }

  type Query {
    profile: User
    profiles: [User!]!
  }
`;
