import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  # Root Query type is required by GraphQL
  type Query {
    # Query to get the current developer (for testing purposes)
    currentDeveloper: Developer
  }

  # Developer type
  type Developer {
    _id: ID!        # Matches the database field directly
    name: String!   # Assuming 'name' exists in your database
    email: String!
  }

  # AuthPayload type
  type AuthPayload {
    token: String!
    developer: Developer!
  }

  # Mutation type for login
  type Mutation {
    login(email: String!, password: String!): AuthPayload
  }
`;

export default typeDefs;