import { gql } from "apollo-server-express";

const typeDefs = gql`
  # Developer type definition
  type Developer {
    _id: ID!
    email: String!
    imageUrl: String
    firstName: String
    lastName: String
    telephone: String
    city: String
    state: String
    portfolioLink: String
    githubLink: String
    hourlyRate: Int
    bio: String
  }

  # Auth payload for login/signup responses
  type Auth {
    token: String!
    developer: Developer!
  }

  # Queries
  type Query {
    # Get the authenticated developer's data
    me: Developer

    # Get a list of all developers
    developers: [Developer]
  }

  # Input type for updating developer details
  input UpdateDeveloperInput {
    _id: ID
    imageUrl: String
    firstName: String
    lastName: String
    telephone: String
    email: String!
    city: String
    state: String
    portfolioLink: String
    githubLink: String
    hourlyRate: Float
    bio: String
  }

  # Mutations
  type Mutation {
    # Log in a developer
    login(email: String!, password: String!): Auth

    # Add a new developer (sign up)
    addDeveloper(email: String!, password: String!): Auth

    # Update a developer's profile
    updateDeveloper(input: UpdateDeveloperInput!): Developer

    # Delete a developer account
    deleteDeveloper(id: ID!): Message
  }

  # Message response for deletions
  type Message {
    message: String!
  }
`;

export default typeDefs;
