import { gql } from "@apollo/client";

// Query to get the currently logged-in developer's data
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

// Query to get all developers (browse all)
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

// Query to get a specific developer by ID
export const GET_DEVELOPER_BY_ID = gql`
  query getDeveloperById($id: ID!) {
    developer(id: $id) {
      _id
      email
      firstName
      lastName
      city
      state
      hourlyRate
      bio
      portfolioLink
      githubLink
      imageUrl
    }
  }
`;

export default {
  GET_ME,
  GET_DEVELOPERS,
  GET_DEVELOPER_BY_ID,
};
