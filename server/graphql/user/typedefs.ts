export const typeDef = `
  type User {
    email: String,
    name: String,
    givenName: String,
    familynName: String,
    picture: String,
    token: String,
  }

  extend type Query {
    profile: User
    profiles: [User!]!
  }
`
