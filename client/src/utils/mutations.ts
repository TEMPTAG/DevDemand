import { gql } from "@apollo/client";

// Mutation to log in a developer
export const LOGIN_DEV = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      developer {
        _id
        email
      }
    }
  }
`;

// Mutation to add a developer (sign up)
export const ADD_DEV = gql`
  mutation addDeveloper($email: String!, $password: String!) {
    addDeveloper(email: $email, password: $password) {
      token
      developer {
        _id
        email
      }
    }
  }
`;

// Mutation to update a developer profile
export const UPDATE_DEV = gql`
  mutation updateDeveloper($input: UpdateDeveloperInput!) {
    updateDeveloper(input: $input) {
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
      imageUrl
    }
  }
`;

// Mutation to delete a developer
export const DELETE_DEV = gql`
  mutation deleteDeveloper($id: ID!) {
    deleteDeveloper(id: $id) {
      message
    }
  }
`;
