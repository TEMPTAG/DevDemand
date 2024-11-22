import { gql } from "@apollo/client";

// Query for logged-in developer
export const GET_ME = gql`
  query me {
    me {
      _id
      imageUrl
      firstName
      lastName
      telephone
      email
      city
      state
      portfolioLink
      githubLink
      hourlyRate
      bio
    }
  }
`;

// Query to browse all developers
export const GET_DEVELOPERS = gql`
  query GetDevelopers {
    developers {
      _id
      imageUrl
      firstName
      lastName
      telephone
      email
      city
      state
      portfolioLink
      githubLink
      hourlyRate
      bio
    }
  }
`;

// Query to fetch a specific developer by ID
export const GET_DEVELOPER_BY_ID = gql`
  query getDeveloperById($id: ID!) {
    developer(id: $id) {
      _id
      imageUrl
      firstName
      lastName
      telephone
      email
      city
      state
      portfolioLink
      githubLink
      hourlyRate
      bio
    }
  }
`;
